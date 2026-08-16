import { useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { TimelineLocaleKey } from './locales.ts'
import css from './Timeline.module.css'

type MarkerKind = 'context' | 'user' | 'assistant' | 'tool' | 'other'

interface Marker {
  readonly key: string
  readonly title: string
  readonly text: string
  readonly row: HTMLElement
}

interface RailLayout {
  readonly left: number
  readonly centerY: number
  readonly maxHeight: number
}

interface PointerSession {
  readonly pointerId: number
  readonly captureTarget: HTMLElement
  readonly startKey: string
  currentKey: string
  moved: boolean
}

export type TimelineProps = PropsRuntime<'conversation.session.header.utilities'>
  & PropsLocale<'dsh.codexTimeline'>

const MINIMUM_MARKERS = 4
const PREVIEW_DELAY_MS = 150
const ROW_HEIGHT = 10
const CLICK_JUMP_MS = 200

function clean(value: string): string {
  return value.replace(/\s+/gu, ' ').trim()
}

function markerKind(row: HTMLElement): MarkerKind {
  const kind = row.dataset.chatFlowKind
  if (kind === 'context') return 'context'
  if (kind === 'user' || kind === 'steering') return 'user'
  if (kind?.includes('assistant')) return 'assistant'
  if (kind?.includes('tool') || kind?.includes('command')) return 'tool'
  return 'other'
}

function plainRowText(row: HTMLElement): string {
  const clone = row.cloneNode(true) as HTMLElement
  for (const element of clone.querySelectorAll('button, [aria-hidden="true"], [data-context-source], [data-context-summary], [data-variant="think"]')) {
    element.remove()
  }
  return clean(clone.innerText || clone.textContent || '')
}

function userMessageText(row: HTMLElement): string {
  const userRoot = row.querySelector<HTMLElement>('[data-time-hover-root]')
  const userStack = userRoot?.firstElementChild as HTMLElement | null | undefined
  return clean(userStack?.innerText || userStack?.textContent || '') || plainRowText(row)
}

function assistantResponseText(row: HTMLElement): string {
  return plainRowText(row)
}

function findScrollport(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-conversation-scroll]')
}

function readMarkers(scrollport: HTMLElement, t: (key: TimelineLocaleKey) => string): Marker[] {
  const flow = scrollport.querySelector<HTMLElement>('[data-chat-flow]')
  if (flow === null) return []

  const rows = [...flow.querySelectorAll<HTMLElement>('[data-chat-anchor-key]')]
  const markers: Marker[] = []
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index]
    if (markerKind(row) !== 'user') continue

    const title = userMessageText(row) || t('message')
    let response = ''
    for (let cursor = index + 1; cursor < rows.length; cursor += 1) {
      const candidate = rows[cursor]
      const kind = markerKind(candidate)
      if (kind === 'user') break
      if (kind !== 'assistant') continue
      const text = assistantResponseText(candidate)
      if (text.length > 0) response = text
    }

    markers.push({
      key: row.dataset.chatAnchorKey ?? `user-message-${index}`,
      title,
      text: response || t('noPreview'),
      row,
    })
  }
  return markers
}

function railLayout(scrollport: HTMLElement): RailLayout | null {
  const rect = scrollport.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) return null
  return {
    left: rect.left + 12,
    centerY: rect.top + rect.height / 2,
    maxHeight: Math.max(80, Math.min(rect.height * 0.7, 640)),
  }
}

function visibleMarkerKeys(scrollport: HTMLElement, markers: readonly Marker[]): Set<string> {
  const root = scrollport.getBoundingClientRect()
  const visible = markers.filter(({ row }) => {
    const rect = row.getBoundingClientRect()
    return rect.bottom > root.top + 16 && rect.top < root.bottom
  })
  if (visible.length > 0) return new Set(visible.map(marker => marker.key))

  let nearest: Marker | null = null
  let nearestDistance = Number.POSITIVE_INFINITY
  for (const marker of markers) {
    const distance = Math.abs(marker.row.getBoundingClientRect().top - root.top - 16)
    if (distance < nearestDistance) {
      nearest = marker
      nearestDistance = distance
    }
  }
  return new Set(nearest === null ? [] : [nearest.key])
}

function sameKeys(left: Set<string>, right: Set<string>): boolean {
  return left.size === right.size && [...left].every(key => right.has(key))
}

function flashRow(row: HTMLElement): void {
  const target = row.querySelector<HTMLElement>('[data-time-hover-root]') ?? row
  target.animate?.([
    { backgroundColor: 'color-mix(in srgb, currentColor 14%, transparent)' },
    { backgroundColor: 'color-mix(in srgb, currentColor 14%, transparent)', offset: 0.35 },
    { backgroundColor: 'color-mix(in srgb, currentColor 5%, transparent)' },
  ], {
    duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1400,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  })
}

export function Timeline({ t }: TimelineProps) {
  const [layout, setLayout] = useState<RailLayout | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [activeKeys, setActiveKeys] = useState<Set<string>>(() => new Set())
  const [hovered, setHovered] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const [scrubTarget, setScrubTarget] = useState<string | null>(null)
  const scrollportRef = useRef<HTMLElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>())
  const pointerSession = useRef<PointerSession | null>(null)
  const previewTimer = useRef<number | null>(null)
  const scrollAnimRef = useRef<number | null>(null)
  const ignoreNextClick = useRef(false)

  const clearPreviewTimer = (): void => {
    if (previewTimer.current !== null) {
      window.clearTimeout(previewTimer.current)
      previewTimer.current = null
    }
  }

  const openPreview = (key: string, delayed: boolean): void => {
    clearPreviewTimer()
    setHovered(key)
    if (!delayed) {
      setPreviewOpen(true)
      return
    }
    previewTimer.current = window.setTimeout(() => {
      previewTimer.current = null
      setPreviewOpen(true)
    }, PREVIEW_DELAY_MS)
  }

  const closePreview = (): void => {
    clearPreviewTimer()
    setPreviewOpen(false)
    setHovered(null)
  }

  const updateViewport = (scrollport: HTMLElement, nextMarkers: readonly Marker[]): void => {
    setLayout(railLayout(scrollport))
    const next = visibleMarkerKeys(scrollport, nextMarkers)
    setActiveKeys(current => sameKeys(current, next) ? current : next)
  }

  const refresh = (): void => {
    const scrollport = findScrollport()
    scrollportRef.current = scrollport
    if (scrollport === null) {
      setLayout(null)
      setMarkers([])
      setActiveKeys(new Set())
      return
    }
    const nextMarkers = readMarkers(scrollport, t)
    setMarkers(nextMarkers)
    updateViewport(scrollport, nextMarkers)
  }

  useEffect(() => {
    let frame: number | null = null
    const schedule = (): void => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        frame = null
        refresh()
      })
    }
    schedule()
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { subtree: true, childList: true, characterData: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', schedule)
      clearPreviewTimer()
      if (frame !== null) window.cancelAnimationFrame(frame)
      if (scrollAnimRef.current !== null) window.cancelAnimationFrame(scrollAnimRef.current)
    }
  }, [t])

  useEffect(() => {
    const scrollport = scrollportRef.current
    if (scrollport === null) return
    let frame: number | null = null
    const onScroll = (): void => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        frame = null
        updateViewport(scrollport, markers)
      })
    }
    scrollport.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scrollport.removeEventListener('scroll', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [markers])

  const selected = useMemo(() => markers.find(marker => marker.key === hovered) ?? null, [hovered, markers])

  const animateScrollTo = (scrollport: HTMLElement, targetTop: number, duration: number): void => {
    if (scrollAnimRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimRef.current)
      scrollAnimRef.current = null
    }
    const startTop = scrollport.scrollTop
    const distance = targetTop - startTop
    if (Math.abs(distance) < 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || duration <= 0) {
      scrollport.scrollTo({ top: targetTop, behavior: 'auto' })
      return
    }
    const startTime = performance.now()
    const ease = (progress: number): number => 1 - Math.pow(1 - progress, 3)
    const step = (now: number): void => {
      const progress = Math.min(1, (now - startTime) / duration)
      scrollport.scrollTo({ top: startTop + distance * ease(progress), behavior: 'auto' })
      scrollAnimRef.current = progress < 1 ? window.requestAnimationFrame(step) : null
    }
    scrollAnimRef.current = window.requestAnimationFrame(step)
  }

  const scrollToMarker = (marker: Marker, behavior: ScrollBehavior): void => {
    const scrollport = scrollportRef.current
    if (scrollport !== null) {
      const rowTop = marker.row.getBoundingClientRect().top - scrollport.getBoundingClientRect().top + scrollport.scrollTop
      const targetTop = Math.max(0, rowTop - scrollport.clientHeight / 3)
      if (behavior === 'smooth') animateScrollTo(scrollport, targetTop, CLICK_JUMP_MS)
      else scrollport.scrollTo({ top: targetTop, behavior })
    } else {
      marker.row.scrollIntoView({ behavior, block: 'start' })
    }
    flashRow(marker.row)
  }

  const markerAtPointer = (clientY: number): Marker | null => {
    const rail = railRef.current
    if (rail === null || markers.length === 0) return null
    const rect = rail.getBoundingClientRect()
    const contentY = Math.max(0, Math.min(rect.height - 1, clientY - rect.top)) + rail.scrollTop
    const index = Math.max(0, Math.min(markers.length - 1, Math.floor(contentY / ROW_HEIGHT)))
    return markers[index] ?? null
  }

  const finishPointerSession = (event: ReactPointerEvent<HTMLDivElement>): void => {
    const session = pointerSession.current
    if (session === null || session.pointerId !== event.pointerId) return
    pointerSession.current = null
    setScrubbing(false)
    setScrubTarget(null)
    if (session.captureTarget.hasPointerCapture?.(event.pointerId)) {
      session.captureTarget.releasePointerCapture?.(event.pointerId)
    }
    // Pointer capture retargets the derived click to the rail, so a plain
    // click never reaches the marker button's onClick. Jump on pointerup
    // instead, and swallow any click the browser still dispatches to the
    // button (the guard self-clears on the next task).
    ignoreNextClick.current = true
    window.setTimeout(() => {
      ignoreNextClick.current = false
    }, 0)
    if (!session.moved && event.type === 'pointerup') {
      const marker = markers.find(marker => marker.key === session.startKey) ?? null
      if (marker !== null) scrollToMarker(marker, 'smooth')
    }
  }

  if (layout === null || markers.length < MINIMUM_MARKERS) return null

  const selectedButton = selected === null ? null : buttonRefs.current.get(selected.key) ?? null
  const buttonRect = selectedButton?.getBoundingClientRect() ?? null
  const previewLeft = buttonRect === null ? layout.left + 36 : buttonRect.right
  const previewTop = buttonRect === null
    ? layout.centerY
    : Math.max(8, Math.min(window.innerHeight - 112, buttonRect.top + buttonRect.height / 2 - 46))

  const portal = (
    <div className={css.portal}>
      <nav
        className={css.railShell}
        aria-label={t('aria')}
        style={{ left: layout.left, top: layout.centerY }}
      >
        <div
          ref={railRef}
          className={css.rail}
          data-scrubbing={scrubbing || undefined}
          style={{ maxHeight: layout.maxHeight }}
          onPointerLeave={() => {
            if (pointerSession.current === null) closePreview()
          }}
          onPointerDownCapture={(event) => {
            if (event.button !== 0) return
            const marker = markerAtPointer(event.clientY)
            if (marker === null) return
            clearPreviewTimer()
            pointerSession.current = {
              pointerId: event.pointerId,
              captureTarget: event.currentTarget,
              startKey: marker.key,
              currentKey: marker.key,
              moved: false,
            }
            event.currentTarget.setPointerCapture?.(event.pointerId)
            setScrubbing(true)
            setScrubTarget(marker.key)
            openPreview(marker.key, false)
          }}
          onPointerMove={(event) => {
            const session = pointerSession.current
            if (session === null || session.pointerId !== event.pointerId) return
            if (event.buttons % 2 === 0) {
              finishPointerSession(event)
              return
            }
            const marker = markerAtPointer(event.clientY)
            if (marker === null || marker.key === session.currentKey) return
            session.currentKey = marker.key
            session.moved = session.moved || marker.key !== session.startKey
            setScrubTarget(marker.key)
            openPreview(marker.key, false)
            scrollToMarker(marker, 'auto')
          }}
          onPointerUpCapture={finishPointerSession}
          onPointerCancelCapture={finishPointerSession}
          onLostPointerCapture={finishPointerSession}
        >
          <div className={css.markerList}>
            {markers.map(marker => (
              <button
                ref={(node) => {
                  if (node === null) buttonRefs.current.delete(marker.key)
                  else buttonRefs.current.set(marker.key, node)
                }}
                type="button"
                key={marker.key}
                className={css.markerButton}
                data-marker-key={marker.key}
                data-scrub-target={scrubTarget === marker.key || undefined}
                aria-current={activeKeys.has(marker.key) ? 'true' : undefined}
                aria-label={marker.title}
                onPointerEnter={() => { openPreview(marker.key, true) }}
                onFocus={() => { openPreview(marker.key, false) }}
                onBlur={() => { if (!scrubbing) closePreview() }}
                onClick={() => {
                  if (ignoreNextClick.current) {
                    ignoreNextClick.current = false
                    return
                  }
                  openPreview(marker.key, false)
                  scrollToMarker(marker, 'smooth')
                }}
              >
                <span className={css.markerSlot}>
                  <span className={css.marker} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      {previewOpen && selected !== null ? (
        <div
          className={css.preview}
          style={{ left: previewLeft, top: previewTop }}
        >
          <div className={css.previewTitle}>{selected.title}</div>
          <p className={css.previewText}>{selected.text}</p>
        </div>
      ) : null}
    </div>
  )

  return createPortal(portal, document.body)
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'dsh.codexTimeline': TimelineLocaleKey
  }
}
