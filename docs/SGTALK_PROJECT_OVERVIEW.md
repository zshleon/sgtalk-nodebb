# SGTALK · 项目说明与维护指南

> 单一事实来源（Single Source of Truth）。新一轮维护/交接前先读本文件。
> 更新日期：2026-06-14（第 3 轮：栅格图标/头像色/Inter 字体/移动端 QA/GitHub 对账/push-to-deploy CI 全部落地）

---

## 1. 项目是什么

SGTALK 是面向**新加坡华人新移民（中产）**的讨论社区——EP/PR/入籍人群，关注租房、育儿、学校、职场、CPF/税务、医疗家政、本地生活等。

- 形态：**节点化（node/tag）论坛**，信息密集、清爽、低噪音，参考 v2ex / fshex。
- 设计语言：**Quiet Premium / 静奢**——保留 v2ex 的密集骨架，质感对标 Linear / Notion / Apple（编辑级字体层次 + 克制暖调留白 + 轻阴影卡片 + 真实品牌识别 + 完整暗色模式）。
- 视觉设计稿（北极星）：`docs/sgtalk-redesign.html`（浏览器打开，右上角切暗色）。

---

## 2. 技术架构（结论：保留 NodeBB，不迁移）

| 层 | 选型 | 说明 |
|---|---|---|
| 论坛引擎 | **NodeBB 4.7**（Docker 镜像 `ghcr.io/nodebb/nodebb:4.7`，见 `Dockerfile.nodebb`） | 自带登录/发帖/通知/搜索/Google SSO/i18n/Admin |
| 基础主题 | `nodebb-theme-harmony` | 现代、响应式；SGTALK 主题在其上做定制 |
| 定制主题 | `themes/nodebb-theme-sgtalk-v2ex` | v2ex 风格的壳：模板 + SCSS + 客户端 JS + 服务端 library.js |
| 数据库 | MongoDB 7（`mongo:7-jammy` 边车容器） | |
| 编排 | `docker-compose.yml`（NodeBB 端口 `127.0.0.1:14567`，前置反代到 https） | |

为什么不迁移到 Discourse/Flarum：已有内容+用户+SSO+i18n+部署；Discourse 是卡片流非 v2ex 密集风、且重；Flarum 需整站迁移。没有现成的高质量 v2ex 风 NodeBB 主题——定制主题就是正确路线。问题来自“主题未打磨、NodeBB 默认件泄漏”，不是架构错误。

---

## 3. 关键路径与访问

| 项 | 值 |
|---|---|
| GitHub（canonical，私库） | `https://github.com/zshleon/sgtalk-nodebb` |
| 本地同步工作副本（Google Drive） | `G:\My Drive\CODEX 2\sgtalk-nodebb`（Mac 上为 `/Users/jingwazhu/.../CODEX 2/sgtalk-nodebb`） |
| 线上 | `https://sgtalk.zshstc.org` |
| 服务器（homelab，dockerhost） | `root@10.0.0.50`（LAN）/ Tailscale `100.106.234.127` |
| 生产 stack 目录 | `/opt/stacks/sgtalk-nodebb` |
| 定制主题目录 | `themes/nodebb-theme-sgtalk-v2ex` |
| Homelab 资料 | `http://wiki.home.arpa/` |

> 服务器 stack **不是 git 仓库**，靠文件同步（rsync/scp）或 CI 部署，不是 `git pull`。

---

## 4. 设计系统速查

- 令牌定义：`scss/variables.scss`（亮/暗双模，全站靠这些 CSS 变量驱动）。
- 精致层：`scss/redesign.scss`——**最后 import**，在真实类名上覆盖出 Quiet Premium 质感；含 12 节点专属色映射 `$sg-nodes` 与历轮 QA 修复。
- 配色：背景 `#F4F6F8` / 卡片 `#FFFFFF` / 墨 `#11181F` / 边框 `#E8ECF1` / 品牌红 `#D23B30`（hover `#B22D24`）。暗色背景 `#0D1117` / 卡片 `#161B22` / 红 `#E5524A`。
- 圆角：卡片 14px、控件 8–12px；阴影柔和真实（非纯平）。
- 字体：系统栈 `Inter → -apple-system → PingFang SC / Microsoft YaHei`。Inter Web 字体已经 `library.js` 的 `filter:meta.getLinkTags` 钩子在 `<head>` 注入（见 §8.3）。**注意：不要在 SCSS 里写 `@import url(google fonts)`**（见坑#2）。
- 节点色：问与答#4F6B91 新移民#3B82F6 安家租房#607D8B 职业与薪资#26364F 金融税务#5E718C 育儿与学校#7C77F2 医疗与家政#8B96A7 本地生活#2DB7A3 交通出行#2D7FA3 数码与网络#385BAF 同城活动#60A5FA 交易#5E718C。
- 品牌资源：`public/brand/{favicon,logo-mark,logo-full,logo-full-dark}.svg`（红色圆角对话框+红点节点）。logo 接入点：`templates/partials/header/brand.tpl`、`templates/footer.tpl`；favicon 由 `public/sgtalk-composer.js` 的 `installFavicon()` 注入（改图标要 bump `faviconVersion`，当前 `20260614-100`）。栅格图标见 §8.1。

---

## 5. 部署与构建流程

**首选：push-to-deploy CI**（见 §10）——把改动 push 到 GitHub `main` 即自动部署。

**手动部署（备用，已验证可用）**，编辑主题文件后：

```sh
# 1) 同步主题到服务器（从工作副本）
rsync -az --delete -e "ssh -i <key>" \
  '<本地>/themes/nodebb-theme-sgtalk-v2ex/' \
  root@10.0.0.50:/opt/stacks/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex/

# 2) 重新编译资源 + 重启（SCSS/模板在 build 阶段编译）
ssh root@10.0.0.50 'cd /opt/stacks/sgtalk-nodebb && \
  docker exec sgtalk-nodebb bash -lc "cd /usr/src/app && ./nodebb build --config=/opt/config/config.json" && \
  docker restart sgtalk-nodebb'
```

- **部署前先备份**：`scripts/backup-sgtalk-nodebb.sh`（mongo + config + uploads，保留 14 天）。最近一次：`backups/20260614-213017`。
- 改右侧边栏 HTML 结构或品牌/分类配置，需重跑服务端脚本（不是只 build）：`scripts/apply-v2ex-shell.js`（写 Mongo 的 widget 与 brand config）、`scripts/install-brand-assets.sh`。
- 验证：`curl -I https://sgtalk.zshstc.org/` + `docker logs --since=5m sgtalk-nodebb | grep -Ei "error|exception|fatal"`。

---

## 6. 重要坑 / 经验（务必牢记）

1. **文件属主/权限**：NodeBB 容器以 uid **501:staff** 运行。文件必须**世界可读**（644/755），否则 NodeBB 读不到 → 资源 500、SCSS 报 `Cannot open file` 致 `client.css` 变 0 字节（全站白板）。手动部署后跑 `chown -R 501:staff <theme>` + `chmod 644/755`；CI 因 644 世界可读，仅做 chmod、不 chown。
2. **SCSS 字体导入**：NodeBB 内置 `sass-embedded` **不接受** `@import url("https://fonts.googleapis.com/...")`，会整份编译失败。Web 字体只能走 `<head>` 的 `<link>`（用 `filter:meta.getLinkTags` 钩子注入，见 §8.3）。
3. **侧栏是 DB 存储的 HTML**，不是模板——结构性改动要改 `scripts/apply-v2ex-shell.js` 的 `buildSidebar()` 并重跑脚本。
4. **Composer 模板是 bind-mount**：`compose.tpl` 及 `templates/partials/composer-*.tpl` 通过 docker-compose 挂到 composer 插件目录；改它们后仍需 `./nodebb build`。
5. **i18n 会覆盖文本**：带 `data-sgtalk-i18n="key"` 的元素会被客户端 i18n 用翻译覆盖 textContent。要让 JS 动态填值（如用户名），需去掉该属性。
6. **`.row` 的 grid 陷阱**：`topic.tpl` 的 `.sg-topic-layout` 里空 schema 节点在 `display:grid` 下污染网格、把内容挤右。已用 `display:flex !important` 修正。
7. **覆盖优先级**：`redesign.scss` 最后加载；用 `!important` 时注意别误伤 `.sg-guest-only/.sg-user-only` 的显隐。
8. **客户端脚本缓存**：`sgtalk-composer.js` 改动后浏览器可能缓存旧包；验证时强刷或确认 `?v=` 已变。
9. **CI 不能用 `docker compose`**：它要读 root:600 的 `.env` → `permission denied`。CI 用 `docker exec/restart` 直连容器。
10. **重启后需轮询验证**：`docker restart` 后 NodeBB 需数十秒才回 200，验证脚本用轮询重试而非固定 sleep。

---

## 7. 历轮重设计（2026-06-14，第 1–2 轮）

- 重写 `scss/variables.scss` 设计令牌为 Quiet Premium；新增 `scss/redesign.scss` 精致层并 `@import` 到 `theme.scss` 末尾。
- 全新 logo / 字标（SG + 红 TALK）/ favicon（SVG），接入 header、footer、favicon 逻辑。
- **QA 第 1 轮**：删发帖页 Syntax/Markdown 术语；删冗余“社区公约”裸条；修页脚链接稀疏问题。
- **QA 第 2 轮**：发帖 节点/标题框统一 42px；删“原生格式”徽标；修帖子页左侧空白（grid→flex）；工具栏压缩；帖子操作行左对齐；“已登录”改显用户名；退出移到页脚；明暗主题加“跟随系统”三态；header 右侧对齐。

---

## 8. 第 3 轮做了什么（2026-06-14）

**已完成（桌面 + 移动，亮/暗）**：首页/节点/帖子/发帖/登录/注册全部干净统一、已上线验证。

1. **栅格图标**：由 `logo-mark.svg` 重新导出新品牌标（红角对话框+红点），替换主题 `public/favicon-16/32/48/180/192.png`+`.ico` 与核心 `nodebb/uploads/system/favicon.ico`+`touchicon-*`，旧狮头（`merlion.jpg`/`logo_icon`）已清除。浏览器标用圆角版，Apple/PWA 触摸图标用满版方形。`faviconVersion` bump 到 `20260614-100`。
2. **头像底色**：`sgtalk-composer.js` `defaultAvatarBg` `#C13A32` → `#D23B30`。
3. **Inter Web 字体**：经 `library.js` 的 `filter:meta.getLinkTags` 钩子在真实 `<head>` 注入 Google Fonts `<link>`（preconnect + Inter 400/500/600/700，`display=swap`）；避开坑#2。注意核心 `tags.js` 的 whitelist 仅作用于 AJAX 响应，整页加载不受影响。
4. **移动端核查**：headless Chromium 以真实 390×844（DPR2）逐页渲染首页/节点/帖子/活跃/最热/登录/注册（亮+暗共 16 屏），**零横向溢出**、布局干净。
5. **GitHub 对账**：以**生产为准**把整套主题（redesign + brand + 新图标 + scss + 语言包）回灌 GitHub `main`，canonical 不再缺件。
6. **push-to-deploy CI**：见 §10。

**待办 / 可选**：
- 真机（真实手机硬件）最终手感确认（模拟视口已通过，可选）。
- Drive 工作副本与生产/GitHub 的非主题文件（stack 脚本等）按需对账；主题已对齐。
- 头像底色后续可进一步接入 12 节点专属色（当前为统一品牌红）。

---

## 9. 凭据与安全（务必牢记）

- **绝不入库任何密钥**：GitHub PAT、homelab root 密码、Bitwarden 主密码都不写进仓库/文档/记忆，仅按需临时使用。
- push-to-deploy 的固有风险：**能推这个私库 = 能在 homelab 上执行命令**（runner 在 docker 组，docker≈root）。防线靠：私库 + 限定权限 PAT + 分支保护。建议给 `main` 开启分支保护/必需 review。
- CI runner 以**非 root 专用用户 `ghdeploy`** 运行（在 `docker` 组）。

---

## 10. push-to-deploy CI（已上线，2026-06-14）

- **触发**：push 到 `main` 且改动 `themes/nodebb-theme-sgtalk-v2ex/**`（或手动 `workflow_dispatch`）。
- **workflow**：`.github/workflows/deploy.yml`（`runs-on: [self-hosted, sgtalk]`）。步骤：checkout → rsync 主题进 stack（`--delete`，排除 `node_modules`/`*.bak`）→ `chmod 644/755` → `docker exec sgtalk-nodebb ... ./nodebb build` + `docker restart sgtalk-nodebb` → 轮询 `curl` 直到 200（最多 ~2 分钟）。
- **runner**：homelab `dockerhost` 上的 systemd 服务 `actions.runner.zshleon-sgtalk-nodebb.homelab-sgtalk`，运行目录 `/opt/actions-runner`，用户 `ghdeploy`，标签 `sgtalk`。
  - 状态：`systemctl status actions.runner.zshleon-sgtalk-nodebb.homelab-sgtalk`
  - 重装/删除：`/opt/actions-runner/svc.sh stop|start|uninstall`，重注册需新的 registration-token（GitHub API 或仓库 Settings → Actions → Runners）。
- **手动部署仍可用**（见 §5），CI 与手动不冲突。

---

## 11. 关键文件索引

- `scss/variables.scss`（令牌）、`scss/redesign.scss`（精致层 + 节点色 + QA）、`theme.scss`（末尾 `@import "scss/redesign"`）
- `public/brand/*.svg`（品牌资源）、`public/favicon-*.png`/`favicon.ico`/`touchicon-*.png`（第 3 轮新栅格图标）
- `templates/partials/header/brand.tpl`（logo/字标/三态主题/用户名）、`templates/footer.tpl`（logo + 退出）
- `public/sgtalk-composer.js`（favicon 注入、头像底色、用户名）、`library.js`（nav 节点、`addFontLinks` 字体钩子）、`plugin.json`（钩子注册）
- `.github/workflows/deploy.yml`（CI）
- 文档：`docs/SGTALK_PROJECT_OVERVIEW.md`（本文件）、`docs/sgtalk-redesign.html`
