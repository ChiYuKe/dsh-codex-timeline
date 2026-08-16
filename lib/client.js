window.__ModuleLoader__.load({
	id: "dsh-codex-timeline",
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
		//#region \0dsh-css:C:\Users\Administrator\Desktop\Project\DeepseekH\plugins\dsh-codex-timeline\src\client\Timeline.module.css.mjs
		const css = ".wzPfQW_root{display:inline-flex}.wzPfQW_trigger{color:var(--text-secondary,#c6cad4);cursor:pointer;font:inherit;background:0 0;border:1px solid #0000;border-radius:999px;align-items:center;min-height:30px;padding:0 10px;display:inline-flex}.wzPfQW_trigger:hover,.wzPfQW_trigger[aria-expanded=true]{background:var(--fill-tertiary,#3a3d45);color:var(--text-primary,#fff)}.wzPfQW_portal{pointer-events:none;z-index:940;position:fixed;inset:0}.wzPfQW_rail{pointer-events:auto;width:26px;position:fixed}.wzPfQW_track{background:color-mix(in srgb, var(--border-primary,#4b4f59) 82%, transparent);border-radius:2px;width:2px;height:100%;position:absolute;top:0;left:9px}.wzPfQW_marker{background:var(--text-tertiary,#858b99);cursor:pointer;border:0;border-radius:2px;min-width:20px;height:2px;padding:0;transition:background .12s,height .12s,min-width .12s;position:absolute;left:0;transform:translateY(-1px)}.wzPfQW_marker:hover,.wzPfQW_marker[data-active=true]{background:var(--dsw-static-deepseek-500,#6e9cf5);min-width:26px;height:4px}.wzPfQW_marker[data-kind=context]{background:#8a83d9}.wzPfQW_marker[data-kind=user]{background:#b98de4}.wzPfQW_marker[data-kind=assistant]{background:#87aee9}.wzPfQW_marker[data-kind=tool]{background:#8b939f}.wzPfQW_preview{background:var(--dsw-alias-fill-primary,#303136);border:1px solid var(--dsw-alias-line-primary,#4a4d55);color:var(--dsw-alias-label-primary,#f0f2f6);pointer-events:auto;border-radius:9px;min-width:220px;max-width:min(380px,100vw - 80px);padding:12px 14px;position:fixed;box-shadow:0 12px 34px #00000059}.wzPfQW_previewTitle{text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:650;line-height:1.35;overflow:hidden}.wzPfQW_previewText{color:var(--dsw-alias-label-secondary,#c2c6cf);max-height:72px;margin:7px 0 0;font-size:12px;line-height:1.5;overflow:hidden}.wzPfQW_previewMeta{color:var(--dsw-alias-label-tertiary,#9aa0ad);text-overflow:ellipsis;white-space:nowrap;margin-top:8px;font-size:11px;line-height:1.4;overflow:hidden}";
		const tagId = "dsh-codex-timeline/Timeline.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-codex-timeline";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var Timeline_module_css_default = {
			"root": "wzPfQW_root",
			"previewTitle": "wzPfQW_previewTitle",
			"portal": "wzPfQW_portal",
			"preview": "wzPfQW_preview",
			"previewText": "wzPfQW_previewText",
			"trigger": "wzPfQW_trigger",
			"previewMeta": "wzPfQW_previewMeta",
			"marker": "wzPfQW_marker",
			"track": "wzPfQW_track",
			"rail": "wzPfQW_rail"
		};
		//#endregion
		//#region src/client/Timeline.tsx
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
		function markerText(row, t) {
			const source = row.querySelector("[data-context-source]");
			const summary = row.querySelector("[data-context-summary]");
			const visible = clean(row.innerText || row.textContent || "");
			const title = visible.slice(0, 80) || t("message");
			const text = visible.length > title.length ? visible.slice(title.length).trim() : clean(summary?.textContent ?? "");
			const sourceText = source === null ? null : clean(source.textContent ?? "");
			return {
				title,
				text: text || t("noPreview"),
				source: sourceText
			};
		}
		function findScrollport() {
			return document.querySelector("[data-conversation-scroll]");
		}
		function readMarkers(scrollport, t) {
			const flow = scrollport.querySelector("[data-chat-flow]");
			if (flow === null) return [];
			const rows = [...flow.querySelectorAll("[data-chat-anchor-key]")];
			const total = Math.max(1, flow.scrollHeight, scrollport.scrollHeight);
			return rows.map((row) => {
				const top = row.offsetTop + row.offsetHeight / 2;
				const content = markerText(row, t);
				return {
					key: row.dataset.chatAnchorKey ?? String(top),
					kind: markerKind(row),
					ratio: Math.max(0, Math.min(1, top / total)),
					...content,
					row
				};
			});
		}
		function railLayout(scrollport) {
			const rect = scrollport.getBoundingClientRect();
			if (rect.width <= 0 || rect.height <= 0) return null;
			return {
				left: Math.max(4, rect.left + 6),
				top: Math.max(4, rect.top),
				height: Math.max(40, rect.height - 8),
				right: rect.right
			};
		}
		function previewPosition(layout, marker) {
			const left = Math.min(layout.left + 36, window.innerWidth - 240);
			const desiredTop = layout.top + marker.ratio * layout.height - 34;
			return {
				left,
				top: Math.max(8, Math.min(window.innerHeight - 150, desiredTop))
			};
		}
		function Timeline({ t }) {
			const [visible, setVisible] = (0, react.useState)(true);
			const [layout, setLayout] = (0, react.useState)(null);
			const [markers, setMarkers] = (0, react.useState)([]);
			const [hovered, setHovered] = (0, react.useState)(null);
			const [active, setActive] = (0, react.useState)(null);
			const scrollportRef = (0, react.useRef)(null);
			const clearHoverTimer = (0, react.useRef)(null);
			const refresh = () => {
				const scrollport = findScrollport();
				scrollportRef.current = scrollport;
				if (scrollport === null) {
					setLayout(null);
					setMarkers([]);
					return;
				}
				setLayout(railLayout(scrollport));
				setMarkers(readMarkers(scrollport, t));
				const center = scrollport.scrollTop + scrollport.clientHeight / 2;
				const nearest = [...readMarkers(scrollport, t)].sort((a, b) => Math.abs(a.ratio * scrollport.scrollHeight - center) - Math.abs(b.ratio * scrollport.scrollHeight - center))[0];
				setActive(nearest?.key ?? null);
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
				const timer = window.setInterval(schedule, 1200);
				return () => {
					observer.disconnect();
					window.removeEventListener("resize", schedule);
					window.clearInterval(timer);
					if (frame !== null) window.cancelAnimationFrame(frame);
				};
			}, [t]);
			(0, react.useEffect)(() => {
				const scrollport = scrollportRef.current;
				if (scrollport === null) return;
				const onScroll = () => {
					setLayout(railLayout(scrollport));
					const center = scrollport.scrollTop + scrollport.clientHeight / 2;
					const next = [...markers].sort((a, b) => Math.abs(a.ratio * scrollport.scrollHeight - center) - Math.abs(b.ratio * scrollport.scrollHeight - center))[0];
					setActive(next?.key ?? null);
				};
				scrollport.addEventListener("scroll", onScroll, { passive: true });
				return () => {
					scrollport.removeEventListener("scroll", onScroll);
				};
			}, [markers]);
			const selected = (0, react.useMemo)(() => markers.find((marker) => marker.key === hovered) ?? null, [hovered, markers]);
			if (layout === null || markers.length === 0 || !visible) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: Timeline_module_css_default.trigger,
				"aria-expanded": visible,
				"aria-label": t("navigationOff"),
				onClick: () => {
					setVisible(true);
					window.setTimeout(refresh, 0);
				},
				children: t("navigation")
			});
			const portal = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Timeline_module_css_default.portal,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: Timeline_module_css_default.rail,
					"aria-label": t("aria"),
					style: {
						left: layout.left,
						top: layout.top,
						height: layout.height
					},
					onMouseLeave: () => {
						clearHoverTimer.current = window.setTimeout(() => {
							setHovered(null);
						}, 160);
					},
					onMouseEnter: () => {
						if (clearHoverTimer.current !== null) window.clearTimeout(clearHoverTimer.current);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: Timeline_module_css_default.track }), markers.map((marker) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: Timeline_module_css_default.marker,
						"data-kind": marker.kind,
						"data-active": marker.key === active || void 0,
						style: { top: `${marker.ratio * 100}%` },
						"aria-label": marker.title,
						onMouseEnter: () => {
							setHovered(marker.key);
						},
						onClick: () => {
							const scrollport = scrollportRef.current;
							if (scrollport === null) return;
							scrollport.scrollTo({
								top: Math.max(0, marker.row.offsetTop - scrollport.clientHeight / 3),
								behavior: "smooth"
							});
						}
					}, marker.key))]
				}), selected !== null ? (() => {
					const position = previewPosition(layout, selected);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Timeline_module_css_default.preview,
						style: {
							left: position.left,
							top: position.top
						},
						onMouseEnter: () => {
							if (clearHoverTimer.current !== null) window.clearTimeout(clearHoverTimer.current);
						},
						onMouseLeave: () => {
							setHovered(null);
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: Timeline_module_css_default.previewTitle,
								children: selected.title
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: Timeline_module_css_default.previewText,
								children: selected.text
							}),
							selected.source !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: Timeline_module_css_default.previewMeta,
								children: [
									t(selected.kind === "context" ? "contextInjection" : "message"),
									" · ",
									selected.source
								]
							}) : null
						]
					});
				})() : null]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: Timeline_module_css_default.trigger,
				"aria-expanded": "true",
				"aria-label": t("navigationOn"),
				onClick: () => {
					setVisible(false);
				},
				children: t("navigation")
			}), (0, react_dom.createPortal)(portal, document.body)] });
		}
		//#endregion
		//#region src/client/index.ts
		const NS = "dsh.codexTimeline";
		const inject = ["slots", "locale"];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-codex-timeline: dictionaries");
			ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
				name: "conversation.session.header.utilities",
				id: "dsh-codex-timeline",
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