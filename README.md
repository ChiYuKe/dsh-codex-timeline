# dsh-message-map

[![npm version](https://img.shields.io/npm/v/dsh-message-map)](https://www.npmjs.com/package/dsh-message-map)

为 DSH 移植 Codex 风格的会话消息导航轨道（Message map）。

- 在会话右上角显示"消息导航"按钮；
- 在聊天区域左侧按消息位置绘制纵向刻度；
- 悬停刻度显示消息摘要和上下文注入来源；
- 点击刻度平滑跳转到对应消息，目标消息短暂高亮；
- 按住并拖动刻度可快速扫览消息；
- 监听消息追加、加载历史、窗口尺寸和滚动状态变化；
- 会话内用户消息达到 4 条后自动出现按钮与消息轴（不足 4 条时不显示）。

这个插件只使用 DSH 已渲染的会话节点，不修改会话数据，也不执行 Host 命令。

## 效果预览

![消息导航效果](docs/message-map.png)

## 安装

**从 GitHub 安装（其他用户使用）：**

```sh
dsh plugin --profile web add github:ChiYuKe/dsh-message-map
```

推荐锁定版本安装（后续推送不会悄悄改变实际运行的内容）：

```sh
dsh plugin --profile web add github:ChiYuKe/dsh-message-map#v0.1.0
```

仓库已提交构建产物 `lib/`，且没有 `prepare` 脚本，因此**不需要 allowBuilds 授权**，装完即可使用。

**本地安装（开发/测试用，路径指向包含 `package.json` 的插件目录，相对路径或绝对路径均可）：**

```sh
dsh plugin --profile web add /path/to/dsh-message-map
```

本地安装为 link 方式：修改 `src/` 后需先 `pnpm build` 重新构建 `lib/`，再刷新页面生效。

## 使用

```sh
dsh --profile web
```

打开任意会话，右上角出现"消息导航"按钮；点击显示/隐藏聊天区域左侧的消息刻度。

## 开发与构建

```sh
pnpm install
pnpm build     # tsdown 重新生成 lib/index.js 与 lib/client.js
```

发布前把重新构建的 `lib/` 一起提交进仓库（git 安装直接使用仓库里的构建产物）。

## 依赖

- peerDependencies：`react`/`react-dom`、`@deepseek-ai/cordis` 与三个客户端平台模块
  （`@deepseek-ai/dsh-client-locale`、`@deepseek-ai/dsh-client-runtime`、`@deepseek-ai/dsh-client-ui-slots`），
  由 DSH web 壳的 loader 模块表提供，运行时经 `window.__ModuleLoader__` 解析。
- devDependencies：`tsdown` + `lightningcss`，用于自包含构建。

## 从 npm 安装

已发布到 npm，用户可直接安装：

```sh
dsh plugin --profile web add dsh-message-map
```

查看包：https://www.npmjs.com/package/dsh-message-map
