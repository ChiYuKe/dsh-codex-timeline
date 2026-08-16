window.__ModuleLoader__.load({
	id: "dsh-message-map",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_dom = require("react-dom");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/locales.ts
		const zh = {
			navigation: "消息导航",
			navigationOn: "隐藏消息导航",
			navigationOff: "显示消息导航",
			aria: "会话消息导航",
			message: "消息",
			contextInjection: "上下文注入",
			contextRecall: "上下文召回",
			noPreview: "暂无消息摘要"
		};
		const en = {
			navigation: "Message map",
			navigationOn: "Hide message map",
			navigationOff: "Show message map",
			aria: "Conversation message map",
			message: "Message",
			contextInjection: "Context injection",
			contextRecall: "Context recall",
			noPreview: "No message preview"
		};
		//#endregion
		//#region \0dsh-css:C:\Users\Administrator\Desktop\Project\deepseek-harness-desktop\plugins\dsh-message-map\src\client\Timeline.module.css.mjs
		const css = ".kjN5_a_root{display:inline-flex}.kjN5_a_portal{pointer-events:none;z-index:940;position:fixed;inset:0}.kjN5_a_railShell{pointer-events:auto;animation:.15s cubic-bezier(.23,1,.32,1) kjN5_a_rail-in;position:fixed;transform:translateY(-50%)}@keyframes kjN5_a_rail-in{0%{opacity:0}to{opacity:1}}.kjN5_a_rail{--edge-fade-distance:40px;-ms-overflow-style:none;mask-image:linear-gradient(to bottom, transparent, #000 var(--edge-fade-distance), #000 calc(100% - var(--edge-fade-distance)), transparent);overscroll-behavior:contain;scrollbar-width:none;max-width:36px;overflow:hidden auto}.kjN5_a_rail::-webkit-scrollbar{display:none}.kjN5_a_markerList{flex-direction:column;display:flex}.kjN5_a_markerButton{cursor:pointer;background:0 0;border:0;outline:none;flex:0 0 10px;align-items:center;width:36px;height:10px;padding:0;display:flex}.kjN5_a_markerSlot{align-items:center;width:30px;height:2px;display:flex}.kjN5_a_marker{--marker-progress:0;background-color:var(--dsw-alias-label-secondary,#aeb2bb);opacity:.4;height:2px;transform:scaleX(calc(.2308 + .7692 * var(--marker-progress)));transform-origin:0;transition:transform .16s linear(0, .398 10%, .682 20%, .843 30%, .925 40%, .972 50%, 1.004 60%, 1.008 70%, 1.003 80%, 1);width:26px;display:block}.kjN5_a_markerButton[aria-current=true] .kjN5_a_marker{background-color:var(--dsw-alias-label-primary,#f0f2f6);opacity:.6}.kjN5_a_markerButton:has(+.kjN5_a_markerButton[data-scrub-target]) .kjN5_a_marker,.kjN5_a_markerButton[data-scrub-target]+.kjN5_a_markerButton .kjN5_a_marker{--marker-progress:.7}.kjN5_a_markerButton:has(+.kjN5_a_markerButton+.kjN5_a_markerButton[data-scrub-target]) .kjN5_a_marker,.kjN5_a_markerButton[data-scrub-target]+.kjN5_a_markerButton+.kjN5_a_markerButton .kjN5_a_marker{--marker-progress:.4}.kjN5_a_markerButton:has(+.kjN5_a_markerButton+.kjN5_a_markerButton+.kjN5_a_markerButton[data-scrub-target]) .kjN5_a_marker,.kjN5_a_markerButton[data-scrub-target]+.kjN5_a_markerButton+.kjN5_a_markerButton+.kjN5_a_markerButton .kjN5_a_marker{--marker-progress:.2}.kjN5_a_markerButton:focus-visible .kjN5_a_marker,.kjN5_a_markerButton[data-scrub-target] .kjN5_a_marker{--marker-progress:1;background-color:var(--dsw-alias-label-primary,#f0f2f6);opacity:1}.kjN5_a_rail[data-scrubbing] .kjN5_a_marker{transition-duration:0s}.kjN5_a_rail[data-scrubbing] .kjN5_a_markerButton[aria-current=true]:not([data-scrub-target]) .kjN5_a_marker{background-color:var(--dsw-alias-label-secondary,#aeb2bb);opacity:.4}@media (hover:hover){.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton[aria-current=true]:not(:hover):not(:focus-visible) .kjN5_a_marker{background-color:var(--dsw-alias-label-secondary,#aeb2bb);opacity:.4}.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:has(+.kjN5_a_markerButton:hover) .kjN5_a_marker,.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:hover+.kjN5_a_markerButton .kjN5_a_marker{--marker-progress:.7}.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:has(+.kjN5_a_markerButton+.kjN5_a_markerButton:hover) .kjN5_a_marker,.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:hover+.kjN5_a_markerButton+.kjN5_a_markerButton .kjN5_a_marker{--marker-progress:.4}.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:has(+.kjN5_a_markerButton+.kjN5_a_markerButton+.kjN5_a_markerButton:hover) .kjN5_a_marker,.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:hover+.kjN5_a_markerButton+.kjN5_a_markerButton+.kjN5_a_markerButton .kjN5_a_marker{--marker-progress:.2}.kjN5_a_rail:not([data-scrubbing]):hover .kjN5_a_markerButton:hover .kjN5_a_marker{--marker-progress:1;background-color:var(--dsw-alias-label-primary,#f0f2f6);opacity:1}}.kjN5_a_preview{backdrop-filter:blur(4px);background:color-mix(in srgb, var(--dsw-alias-surface-elevated-secondary,#323337) 95%, transparent);box-sizing:border-box;color:var(--dsw-alias-label-primary,#f0f2f6);pointer-events:none;border:0;border-radius:12px;width:320px;max-width:calc(100vw - 16px);padding:8px;transition:top 80ms cubic-bezier(.23,1,.32,1);animation:.12s cubic-bezier(.23,1,.32,1) kjN5_a_preview-in;position:fixed;overflow:hidden;box-shadow:0 12px 36px #00000059,0 2px 8px #00000038}@keyframes kjN5_a_preview-in{0%{opacity:0;transform:translate(-3px)scale(.99)}to{opacity:1;transform:translate(0)scale(1)}}.kjN5_a_previewTitle{text-overflow:ellipsis;white-space:nowrap;align-items:center;gap:6px;min-width:0;font-size:14px;font-weight:600;line-height:20px;display:flex;overflow:hidden}.kjN5_a_previewText{color:var(--dsw-alias-label-secondary,#b9bdc6);-webkit-line-clamp:3;-webkit-box-orient:vertical;max-height:60px;margin:4px 0 0;font-size:14px;line-height:20px;display:-webkit-box;overflow:hidden}@media (prefers-reduced-motion:reduce){.kjN5_a_marker,.kjN5_a_preview,.kjN5_a_railShell{transition-duration:0s;animation-duration:0s}}";
		const tagId = "dsh-message-map/Timeline.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-message-map";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var Timeline_module_css_default = {
			"railShell": "kjN5_a_railShell",
			"markerButton": "kjN5_a_markerButton",
			"marker": "kjN5_a_marker",
			"root": "kjN5_a_root",
			"preview": "kjN5_a_preview",
			"previewTitle": "kjN5_a_previewTitle",
			"portal": "kjN5_a_portal",
			"rail-in": "kjN5_a_rail-in",
			"markerSlot": "kjN5_a_markerSlot",
			"preview-in": "kjN5_a_preview-in",
			"rail": "kjN5_a_rail",
			"previewText": "kjN5_a_previewText",
			"markerList": "kjN5_a_markerList"
		};
		//#endregion
		//#region src/client/Timeline.tsx
		const MINIMUM_MARKERS = 4;
		const PREVIEW_DELAY_MS = 150;
		const ROW_HEIGHT = 10;
		const CLICK_JUMP_MS = 200;
		function clean(value) {
			return value.replace(/\s+/gu, " ").trim();
		}
		function markerKind(row) {
			const kind = row.dataset.chatFlowKind;
			if (kind === "context") return "context";
			if (kind === "user" || kind === "steering") return "user";
			if (kind?.includes("assistant")) return "assistant";
			if (kind?.includes("tool") || kind?.includes("command")) return "tool";
			return "other";
		}
		function plainRowText(row) {
			const clone = row.cloneNode(true);
			for (const element of clone.querySelectorAll("button, [aria-hidden=\"true\"], [data-context-source], [data-context-summary], [data-variant=\"think\"]")) element.remove();
			return clean(clone.innerText || clone.textContent || "");
		}
		function userMessageText(row) {
			const userStack = row.querySelector("[data-time-hover-root]")?.firstElementChild;
			return clean(userStack?.innerText || userStack?.textContent || "") || plainRowText(row);
		}
		function assistantResponseText(row) {
			return plainRowText(row);
		}
		function findScrollport() {
			return document.querySelector("[data-conversation-scroll]");
		}
		function readMarkers(scrollport, t) {
			const flow = scrollport.querySelector("[data-chat-flow]");
			if (flow === null) return [];
			const rows = [...flow.querySelectorAll("[data-chat-anchor-key]")];
			const markers = [];
			for (let index = 0; index < rows.length; index += 1) {
				const row = rows[index];
				if (markerKind(row) !== "user") continue;
				const title = userMessageText(row) || t("message");
				let response = "";
				for (let cursor = index + 1; cursor < rows.length; cursor += 1) {
					const candidate = rows[cursor];
					const kind = markerKind(candidate);
					if (kind === "user") break;
					if (kind !== "assistant") continue;
					const text = assistantResponseText(candidate);
					if (text.length > 0) response = text;
				}
				markers.push({
					key: row.dataset.chatAnchorKey ?? `user-message-${index}`,
					title,
					text: response || t("noPreview"),
					row
				});
			}
			return markers;
		}
		function railLayout(scrollport) {
			const rect = scrollport.getBoundingClientRect();
			if (rect.width <= 0 || rect.height <= 0) return null;
			return {
				left: rect.left + 12,
				centerY: rect.top + rect.height / 2,
				maxHeight: Math.max(80, Math.min(rect.height * .7, 640))
			};
		}
		function visibleMarkerKeys(scrollport, markers) {
			const root = scrollport.getBoundingClientRect();
			const visible = markers.filter(({ row }) => {
				const rect = row.getBoundingClientRect();
				return rect.bottom > root.top + 16 && rect.top < root.bottom;
			});
			if (visible.length > 0) return new Set(visible.map((marker) => marker.key));
			let nearest = null;
			let nearestDistance = Number.POSITIVE_INFINITY;
			for (const marker of markers) {
				const distance = Math.abs(marker.row.getBoundingClientRect().top - root.top - 16);
				if (distance < nearestDistance) {
					nearest = marker;
					nearestDistance = distance;
				}
			}
			return new Set(nearest === null ? [] : [nearest.key]);
		}
		function sameKeys(left, right) {
			return left.size === right.size && [...left].every((key) => right.has(key));
		}
		function flashRow(row) {
			(row.querySelector("[data-time-hover-root]") ?? row).animate?.([
				{ backgroundColor: "color-mix(in srgb, currentColor 14%, transparent)" },
				{
					backgroundColor: "color-mix(in srgb, currentColor 14%, transparent)",
					offset: .35
				},
				{ backgroundColor: "color-mix(in srgb, currentColor 5%, transparent)" }
			], {
				duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1400,
				easing: "cubic-bezier(0.23, 1, 0.32, 1)"
			});
		}
		function Timeline({ t }) {
			const [layout, setLayout] = (0, react.useState)(null);
			const [markers, setMarkers] = (0, react.useState)([]);
			const [activeKeys, setActiveKeys] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			const [hovered, setHovered] = (0, react.useState)(null);
			const [previewOpen, setPreviewOpen] = (0, react.useState)(false);
			const [scrubbing, setScrubbing] = (0, react.useState)(false);
			const [scrubTarget, setScrubTarget] = (0, react.useState)(null);
			const scrollportRef = (0, react.useRef)(null);
			const railRef = (0, react.useRef)(null);
			const buttonRefs = (0, react.useRef)(/* @__PURE__ */ new Map());
			const pointerSession = (0, react.useRef)(null);
			const previewTimer = (0, react.useRef)(null);
			const scrollAnimRef = (0, react.useRef)(null);
			const ignoreNextClick = (0, react.useRef)(false);
			const clearPreviewTimer = () => {
				if (previewTimer.current !== null) {
					window.clearTimeout(previewTimer.current);
					previewTimer.current = null;
				}
			};
			const openPreview = (key, delayed) => {
				clearPreviewTimer();
				setHovered(key);
				if (!delayed) {
					setPreviewOpen(true);
					return;
				}
				previewTimer.current = window.setTimeout(() => {
					previewTimer.current = null;
					setPreviewOpen(true);
				}, PREVIEW_DELAY_MS);
			};
			const closePreview = () => {
				clearPreviewTimer();
				setPreviewOpen(false);
				setHovered(null);
			};
			const updateViewport = (scrollport, nextMarkers) => {
				setLayout(railLayout(scrollport));
				const next = visibleMarkerKeys(scrollport, nextMarkers);
				setActiveKeys((current) => sameKeys(current, next) ? current : next);
			};
			const refresh = () => {
				const scrollport = findScrollport();
				scrollportRef.current = scrollport;
				if (scrollport === null) {
					setLayout(null);
					setMarkers([]);
					setActiveKeys(/* @__PURE__ */ new Set());
					return;
				}
				const nextMarkers = readMarkers(scrollport, t);
				setMarkers(nextMarkers);
				updateViewport(scrollport, nextMarkers);
			};
			(0, react.useEffect)(() => {
				let frame = null;
				const schedule = () => {
					if (frame !== null) return;
					frame = window.requestAnimationFrame(() => {
						frame = null;
						refresh();
					});
				};
				schedule();
				const observer = new MutationObserver(schedule);
				observer.observe(document.body, {
					subtree: true,
					childList: true,
					characterData: true
				});
				window.addEventListener("resize", schedule);
				return () => {
					observer.disconnect();
					window.removeEventListener("resize", schedule);
					clearPreviewTimer();
					if (frame !== null) window.cancelAnimationFrame(frame);
					if (scrollAnimRef.current !== null) window.cancelAnimationFrame(scrollAnimRef.current);
				};
			}, [t]);
			(0, react.useEffect)(() => {
				const scrollport = scrollportRef.current;
				if (scrollport === null) return;
				let frame = null;
				const onScroll = () => {
					if (frame !== null) return;
					frame = window.requestAnimationFrame(() => {
						frame = null;
						updateViewport(scrollport, markers);
					});
				};
				scrollport.addEventListener("scroll", onScroll, { passive: true });
				return () => {
					scrollport.removeEventListener("scroll", onScroll);
					if (frame !== null) window.cancelAnimationFrame(frame);
				};
			}, [markers]);
			const selected = (0, react.useMemo)(() => markers.find((marker) => marker.key === hovered) ?? null, [hovered, markers]);
			const animateScrollTo = (scrollport, targetTop, duration) => {
				if (scrollAnimRef.current !== null) {
					window.cancelAnimationFrame(scrollAnimRef.current);
					scrollAnimRef.current = null;
				}
				const startTop = scrollport.scrollTop;
				const distance = targetTop - startTop;
				if (Math.abs(distance) < 1) return;
				if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || duration <= 0) {
					scrollport.scrollTo({
						top: targetTop,
						behavior: "auto"
					});
					return;
				}
				const startTime = performance.now();
				const ease = (progress) => 1 - Math.pow(1 - progress, 3);
				const step = (now) => {
					const progress = Math.min(1, (now - startTime) / duration);
					scrollport.scrollTo({
						top: startTop + distance * ease(progress),
						behavior: "auto"
					});
					scrollAnimRef.current = progress < 1 ? window.requestAnimationFrame(step) : null;
				};
				scrollAnimRef.current = window.requestAnimationFrame(step);
			};
			const scrollToMarker = (marker, behavior) => {
				const scrollport = scrollportRef.current;
				if (scrollport !== null) {
					const rowTop = marker.row.getBoundingClientRect().top - scrollport.getBoundingClientRect().top + scrollport.scrollTop;
					const targetTop = Math.max(0, rowTop - scrollport.clientHeight / 3);
					if (behavior === "smooth") animateScrollTo(scrollport, targetTop, CLICK_JUMP_MS);
					else scrollport.scrollTo({
						top: targetTop,
						behavior
					});
				} else marker.row.scrollIntoView({
					behavior,
					block: "start"
				});
				flashRow(marker.row);
			};
			const markerAtPointer = (clientY) => {
				const rail = railRef.current;
				if (rail === null || markers.length === 0) return null;
				const rect = rail.getBoundingClientRect();
				const contentY = Math.max(0, Math.min(rect.height - 1, clientY - rect.top)) + rail.scrollTop;
				return markers[Math.max(0, Math.min(markers.length - 1, Math.floor(contentY / ROW_HEIGHT)))] ?? null;
			};
			const finishPointerSession = (event) => {
				const session = pointerSession.current;
				if (session === null || session.pointerId !== event.pointerId) return;
				pointerSession.current = null;
				setScrubbing(false);
				setScrubTarget(null);
				if (session.captureTarget.hasPointerCapture?.(event.pointerId)) session.captureTarget.releasePointerCapture?.(event.pointerId);
				ignoreNextClick.current = true;
				window.setTimeout(() => {
					ignoreNextClick.current = false;
				}, 0);
				if (!session.moved && event.type === "pointerup") {
					const marker = markers.find((marker) => marker.key === session.startKey) ?? null;
					if (marker !== null) scrollToMarker(marker, "smooth");
				}
			};
			if (layout === null || markers.length < MINIMUM_MARKERS) return null;
			const buttonRect = (selected === null ? null : buttonRefs.current.get(selected.key) ?? null)?.getBoundingClientRect() ?? null;
			const previewLeft = buttonRect === null ? layout.left + 36 : buttonRect.right;
			const previewTop = buttonRect === null ? layout.centerY : Math.max(8, Math.min(window.innerHeight - 112, buttonRect.top + buttonRect.height / 2 - 46));
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Timeline_module_css_default.portal,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("nav", {
					className: Timeline_module_css_default.railShell,
					"aria-label": t("aria"),
					style: {
						left: layout.left,
						top: layout.centerY
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: railRef,
						className: Timeline_module_css_default.rail,
						"data-scrubbing": scrubbing || void 0,
						style: { maxHeight: layout.maxHeight },
						onPointerLeave: () => {
							if (pointerSession.current === null) closePreview();
						},
						onPointerDownCapture: (event) => {
							if (event.button !== 0) return;
							const marker = markerAtPointer(event.clientY);
							if (marker === null) return;
							clearPreviewTimer();
							pointerSession.current = {
								pointerId: event.pointerId,
								captureTarget: event.currentTarget,
								startKey: marker.key,
								currentKey: marker.key,
								moved: false
							};
							event.currentTarget.setPointerCapture?.(event.pointerId);
							setScrubbing(true);
							setScrubTarget(marker.key);
							openPreview(marker.key, false);
						},
						onPointerMove: (event) => {
							const session = pointerSession.current;
							if (session === null || session.pointerId !== event.pointerId) return;
							if (event.buttons % 2 === 0) {
								finishPointerSession(event);
								return;
							}
							const marker = markerAtPointer(event.clientY);
							if (marker === null || marker.key === session.currentKey) return;
							session.currentKey = marker.key;
							session.moved = session.moved || marker.key !== session.startKey;
							setScrubTarget(marker.key);
							openPreview(marker.key, false);
							scrollToMarker(marker, "auto");
						},
						onPointerUpCapture: finishPointerSession,
						onPointerCancelCapture: finishPointerSession,
						onLostPointerCapture: finishPointerSession,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: Timeline_module_css_default.markerList,
							children: markers.map((marker) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								ref: (node) => {
									if (node === null) buttonRefs.current.delete(marker.key);
									else buttonRefs.current.set(marker.key, node);
								},
								type: "button",
								className: Timeline_module_css_default.markerButton,
								"data-marker-key": marker.key,
								"data-scrub-target": scrubTarget === marker.key || void 0,
								"aria-current": activeKeys.has(marker.key) ? "true" : void 0,
								"aria-label": marker.title,
								onPointerEnter: () => {
									openPreview(marker.key, true);
								},
								onFocus: () => {
									openPreview(marker.key, false);
								},
								onBlur: () => {
									if (!scrubbing) closePreview();
								},
								onClick: () => {
									if (ignoreNextClick.current) {
										ignoreNextClick.current = false;
										return;
									}
									openPreview(marker.key, false);
									scrollToMarker(marker, "smooth");
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: Timeline_module_css_default.markerSlot,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: Timeline_module_css_default.marker })
								})
							}, marker.key))
						})
					})
				}), previewOpen && selected !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: Timeline_module_css_default.preview,
					style: {
						left: previewLeft,
						top: previewTop
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Timeline_module_css_default.previewTitle,
						children: selected.title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: Timeline_module_css_default.previewText,
						children: selected.text
					})]
				}) : null]
			}), document.body);
		}
		//#endregion
		//#region src/client/index.ts
		const NS = "dsh.codexTimeline";
		const inject = ["slots", "locale"];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-message-map: dictionaries");
			ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
				name: "conversation.session.header.utilities",
				id: "dsh-message-map",
				order: 30,
				locale: NS
			}, Timeline));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map