# SGTALK V2EX-style UI Blueprint

Updated: 2026-06-07

## 1. Product Direction

SGTALK is a Singapore Chinese immigrant forum. The product should feel like a serious, lightweight community tool, not a social media feed, marketing page, or decorative app shell.

Reference direction:
- V2EX-style dense forum flow: header, search, node rail, topic list, right utility rail.
- Node-centric information architecture: topics live in nodes; top navigation is a shortcut layer, not a category taxonomy.
- Honest empty launch: no fake users, no demo posts, no setup prompts in public UI.
- Chinese first, English only for unavoidable product/provider names.

Design tone:
- Minimal, quiet, dense, high-trust.
- Refined public-sector clarity with small Singapore red accents.
- Less rounded than generic SaaS UI; borders and spacing should feel crisp.
- Interaction should be predictable and text-forward.

## 2. Global Layout System

### Desktop Frame

Width:
- Body background: `#eef3f6`.
- Main content max width: 1280px.
- Header inner width: 1280px.
- Content grid: 1fr + 300px sidebar, gap 20px.
- Main list panel and sidebar cards align on the same y-axis.

Header:
- One row only.
- Left: SGTALK logo.
- Center: search input.
- Right: navigation and auth state.
- No secondary top bar.

Header elements:
- Logo: text mark, red `SG`, dark `TALK`, height 34-42px.
- Search: 420-560px desktop, 36-40px high.
- Links: `首页`, `节点`, logged-in user pill, `我的`, `退出`; or `未登录`, `登录`, `注册`.
- User pill includes avatar and display name. If name is long, truncate.

Node rail:
- Directly below header on forum pages.
- Single horizontal white panel.
- Active node/tab dark navy.
- Items: `全部`, `最热`, `新移民`, `安家`, `职场`, `家庭`, `金融`, `生活`, `出行`, `问与答`, `交易`.
- It is a shortcut rail. It does not duplicate a second category row.

Mobile frame:
- Header becomes two lines: logo row + search row if needed.
- Top auth links remain visible.
- Node rail is horizontally scrollable with a subtle right fade.
- Main content width: `calc(100vw - 20px)`.
- Sidebar cards move below topic content.
- No hidden critical login state.

## 3. Shared Components

### Topic Row

Purpose: scanning topics quickly.

Desktop:
- Container: white, bottom border, min height 64-72px.
- Grid: `avatar 48px | content minmax(0,1fr) | replies max-content`.
- Avatar: 48x48, 4px radius, left aligned.
- Title: 15-16px, 800 weight, dark text.
- Meta: 12px, muted, flex-wrap allowed.
- Reply count: light blue-grey pill, 28-40px wide, right aligned.

Mobile:
- Grid: `avatar 40px | content minmax(0,1fr) | replies max-content`.
- Title can wrap to two lines.
- Meta can wrap, but should stay below title, never above it.
- Reply count remains on the right, centered vertically.

Interaction:
- Entire title opens topic.
- Avatar and username open profile.
- Node label opens node page.
- Reply count opens last reply/latest position.
- Hover row background changes subtly.

Failure rule:
- `link`, `meta`, schema anchors, hidden helpers must not occupy grid/flex layout.

### Sidebar Card

Purpose: account and discovery utilities.

Shape:
- White card, 1px border, radius 4-6px.
- Header row 44-52px, strong title.
- Body padding 14-16px.
- Vertical gap 14-18px between cards.

Cards:
- Guest: `加入 SGTALK`, buttons `注册账号`, `登录`.
- Logged-in: avatar, display name, `欢迎回来`, buttons `发布主题`, `我的主页`.
- Hot nodes: dense node links.
- Today hot: list top topics or `暂无热议`.
- Community status: node count, registration state.

Interaction:
- Buttons use clear states: hover, active, disabled.
- Links never look like disabled text unless not clickable.

### Buttons

Primary:
- Red background, white text.
- Height 34-40px.
- Border radius 4px.
- Hover darkens.

Secondary:
- White background, grey-blue border, muted dark text.
- Same height as primary.

Disabled:
- Reduced opacity, cursor not-allowed.
- Must show reason through validation text/toast if action fails.

### Forms

Inputs:
- Height 36-42px.
- Border 1px `#ccd8e5`.
- Focus blue ring with low opacity.
- Labels left aligned.
- Error text below input, not only toast.

Textarea:
- Compose body starts compact but usable.
- Desktop min height 180-240px depending page.
- Mobile min height 132-180px.
- Autosize upward after content, max height with internal scroll.

### Toasts and Modals

Toasts:
- Bottom or top-right depending NodeBB default, but styled consistently.
- Error: red left border.
- Success: green left border.
- Text must be user-facing, not engineering text.

Modal/dropdown:
- Clicking outside closes it.
- Esc closes it.
- Focus returns to trigger.

## 4. Page Designs

### A. Home / Recent / All Topics

URL:
- `/`, `/recent`, `/popular`

Desktop layout:
1. Global header.
2. Node rail.
3. Main grid:
   - Left: list panel.
   - Right: sidebar cards.
4. List panel:
   - Header tabs: `全部主题`, `热门主题`, `新主题`.
   - Right actions: `RSS`, `发布主题` or `登录后发帖`.
   - Topic rows.
5. Empty state:
   - Title: `还没有主题。`
   - Body: `从一个真实问题、经验或新加坡生活细节开始。`
   - Actions: `登录后发帖` or `发布第一个主题`, `查看节点`.
   - Show 4-6 starter node links.

States:
- Guest with topics.
- Guest empty.
- Logged-in with topics.
- Logged-in empty.
- Loading: do not flash raw `载入中`; show small inline skeleton rows or keep server-rendered content.

Interactions:
- Topic title -> topic page.
- Node label -> category page.
- `发布主题` -> compose with default cid.
- `登录后发帖` -> login with return path if possible.
- Top tabs update route and active state.

Acceptance:
- First topic row aligns: avatar left, content center, reply count right.
- Sidebar top aligns with list panel top.
- No duplicated node row.
- No public setup/debug/prompt text.

### B. Node / Category Topic List

URL:
- `/category/:cid/:slug`

Desktop layout:
1. Header and node rail.
2. Main grid.
3. Category head:
   - Breadcrumb: `SGTALK > 节点名`.
   - Node title.
   - One-line description.
   - Optional stats: topics/replies.
4. Topic list bar:
   - Tabs: `全部主题`, `最新回复`, `最新创建`.
   - Action: `发布主题`.
5. Topic rows only from this node.

States:
- Category has topics.
- Category empty.
- Guest cannot post.
- Logged-in can post in this node.

Interactions:
- Posting from category should preselect that node.
- Changing sort should not leave node context.

Acceptance:
- A `问与答` topic must not appear in `新移民` category.
- Category title and selected node rail must agree.
- Empty category does not imply the whole site is empty.

### C. Topic Detail

URL:
- `/topic/:tid/:slug`

Desktop layout:
1. Header and node rail.
2. Main grid.
3. Topic head panel:
   - Breadcrumb: `SGTALK > 节点`.
   - H1 title.
   - Byline: author, time, reply count, state labels.
4. Post body list:
   - Each post row: avatar column + content column.
   - Header: username, time, floor number.
   - Content: readable paragraphs, links, quotes.
   - Footer: reply, like/upvote, bookmark, moderation where allowed.
5. Sidebar:
   - Logged-in/guest card.
   - Hot nodes.
   - Related/today hot if available.

Mobile:
- Topic head becomes compact.
- Post avatar 36-40px.
- Post content never overflows.
- Reply controls wrap below content.

Interactions:
- Username/avatar -> profile.
- Node label -> category.
- Reply button -> quick reply composer or login prompt.
- Delete/moderation visible only to owner/admin/moderator.
- Voting/bookmark states update immediately and survive reload.

Acceptance:
- Topic H1 stays inside panel.
- First post content starts below topic head with clear separation.
- No hidden default NodeBB toolbar floats over content.

### D. Compose New Topic

URL:
- `/compose?cid=:cid`

Desktop layout:
1. Header and node rail.
2. Compose panel, max width 960-1040px.
3. Compose head:
   - Breadcrumb: `SGTALK > 创建新主题`.
   - Title: `发布主题`.
   - Back link: `返回主题列表`.
4. Form:
   - Row 1: Node select + title input + actions.
   - Body label.
   - Body textarea.
   - Optional tags row if enabled.
5. No Markdown syntax selector by default.
6. Formatting toolbar only if it is visually stable and useful; otherwise hide.

Mobile:
- Node select full width.
- Title full width.
- Actions below title, primary on right or full width.
- Textarea min height 132-180px.

Interactions:
- `发布主题` disabled until title/body valid.
- Empty submit shows inline validation and button recovers.
- Successful submit redirects to topic detail.
- `取消` returns to previous list page.
- Node dropdown closes on outside click.

Acceptance:
- User can see selected node before posting.
- Button never appears clickable while request is in progress.
- Failed validation must not lock the textarea or button.

### E. Reply Composer

Location:
- Topic detail quick reply.

Layout:
- Compact box after posts or fixed by NodeBB only if it does not cover content.
- Body textarea, action row.
- No giant editor occupying unrelated blank space.

Interactions:
- Reply submit validates body.
- Success appends reply or redirects to reply anchor.
- Guest reply opens login.

Acceptance:
- Reply composer cannot overlap sidebar/cards.
- On mobile it stays inline and scrolls normally.

### F. Login

URL:
- `/login`

Layout:
1. Header and node rail remain visible.
2. Center auth panel, 420-520px desktop.
3. Title: `登录 SGTALK`.
4. Username/email, password.
5. Login button.
6. Keep logged in checkbox.
7. Other login methods:
   - Google button with Google G mark.
   - WeChat hidden unless actually configured.
8. Register link.

Interactions:
- Failed login shows inline alert.
- Google click starts provider login.
- If provider unavailable, button is hidden or says clearly unavailable only in admin/private surfaces, not as public prompt text.

Acceptance:
- Page remains Chinese.
- No English NodeBB default copy.
- Google button visually recognizable.

### G. Register

URL:
- `/register`

Layout:
- Same auth panel width as login.
- Fields: nickname, email, password, confirm password.
- Primary action: `立即注册`.
- Secondary: Google register.
- Policy sentence: short, human.

Interactions:
- After email registration, show clear confirmation screen:
  - `请查收验证邮件`
  - show target email.
  - action: `我知道了`, `重新发送邮件`.
- Do not silently leave only a small line under the button.

Acceptance:
- User always understands the next step.
- Email sender/template should say SGTALK when email service is configured.

### H. Register Complete / Additional Info

URL:
- `/register/complete`

Layout:
- Not a trap page.
- Clear Chinese copy.
- Only required fields.
- Cancel/continue actions.

Interactions:
- If email is optional, explain why.
- Completing returns to original destination or home.

Acceptance:
- Guest can still navigate away and browse posts.
- No long English privacy wall on public frontend.

### I. User Profile

URL:
- `/user/:slug`, `/me`

Desktop layout:
1. Header and node rail.
2. Profile head card:
   - avatar, display name, handle, member number.
   - join time, last online.
   - edit/settings if owner.
3. Tabs:
   - 主页, 主题, 回复, 收藏, 关注.
4. Main sections:
   - About.
   - Recent topics/replies.
   - Stats.
5. Sidebar can show user actions.

Mobile:
- Avatar 64px.
- Stats 2-column grid.
- Tabs horizontal scroll.

Interactions:
- Clicking username anywhere opens profile.
- Owner actions visible only to owner.
- Admin moderation actions visible only to admin.

Acceptance:
- Google avatar displays when available.
- Fallback avatar is one letter, not both image and letter.

### J. Node Directory

URL:
- `/categories`

Layout:
- Header and node rail.
- Directory head: `SGTALK > 节点`.
- Node groups or flat node list.
- Each node row:
  - name.
  - short description.
  - topic/reply count.
- Future user-created nodes should fit this structure.

Interactions:
- Node click opens category.
- `创建节点` future action hidden until feature is implemented.

Acceptance:
- No fake management copy.
- Empty counts are acceptable.

### K. Search

URL:
- `/search`

Layout:
- Search input in header is primary.
- Results page has tabs: topics, users, nodes.
- Topic result uses same topic row pattern, but smaller.

Interactions:
- Enter in header search opens results.
- Empty query does nothing or focuses field.
- No disruptive modal.

Acceptance:
- Search result row alignment matches topic list.

### L. Admin / Moderation

Surface:
- NodeBB admin remains separate.
- Public moderation affordances can appear on topic/post pages for admin.

Required public actions:
- Delete topic.
- Lock topic.
- Pin topic.
- Move node.
- Delete post.

Interaction:
- Destructive action requires confirmation modal.
- Confirmation copy is Chinese and specific.
- Success returns to list or updates state.

Acceptance:
- Admin actions never show to normal users.
- Deleted content has a clear placeholder.

## 5. Flow Specifications

### Flow 1: Guest Reads and Registers

1. Guest opens `/`.
2. Sees topics or empty state, can browse nodes and topic details.
3. Clicks `登录后发帖`.
4. Goes to `/login`.
5. Can login, register, or Google login.
6. After success, returns to intended compose page or home.

Failure states:
- Login failure: inline alert.
- Provider unavailable: button hidden or disabled with clear copy.
- Email verification needed: clear confirmation page.

### Flow 2: Logged-in User Posts

1. User clicks `发布主题`.
2. Compose opens with default node or current category node.
3. User selects node, writes title/body.
4. Submit disables while posting.
5. Success redirects to topic detail.
6. Topic appears in correct node and all-topic list.

Failure states:
- Missing title/body: inline validation, button recovers.
- Network failure: toast + button recovers.
- Permission failure: clear login/permission message.

### Flow 3: Read Topic and Reply

1. User opens topic.
2. Reads topic head and first post.
3. Clicks reply.
4. Reply composer focuses.
5. Submit appends reply or redirects to reply anchor.

Failure states:
- Guest reply -> login.
- Empty reply -> inline validation.

### Flow 4: Profile Discovery

1. User clicks avatar/name in topic row or post.
2. Profile opens.
3. Tabs show topics/replies.
4. Owner sees edit/settings; others do not.

### Flow 5: Moderator Deletes Topic

1. Admin opens topic.
2. Clicks moderation menu.
3. Chooses delete.
4. Confirmation modal.
5. Success removes topic from lists and returns to relevant list.

## 6. Responsive Rules

Breakpoints:
- `>= 1200`: full desktop, 2-column grid.
- `992-1199`: 2-column if width allows; sidebar 280px.
- `768-991`: content single column, sidebar below.
- `< 576`: mobile compact, horizontal node rail.

Mobile must keep:
- Logo visible.
- Search visible.
- Login state visible.
- Node rail visible and scrollable.
- Topic row dense enough to show multiple topics per screen.

Mobile must avoid:
- Giant composer covering the page.
- Hidden login state.
- Sideways page overflow except intentional node rail scroll.
- Cards nested inside cards.

## 7. Interaction QA Checklist

Run after each implementation pass:
- Anonymous `/`: page loads, topic row aligned, no console errors.
- Logged-in `/`: avatar/name visible, publish entry visible.
- `/categories`: nodes visible, counts aligned.
- `/category/5/...`: only node topics visible.
- `/topic/:tid/...`: title, byline, post body aligned.
- `/compose?cid=5`: node/title/body/actions aligned.
- Compose empty submit: validation shown, button recovers.
- Compose success: redirects to topic detail.
- `/login`: Chinese copy, Google button visible if configured.
- `/register`: clear next step after register.
- `/user/:slug`: avatar and stats align.
- Mobile 390x844 for all above core pages.

## 8. Implementation Priority

Phase 1: Layout correctness
- Topic list hidden schema children.
- Consistent 2-column desktop grid.
- Header single-row desktop, readable mobile.
- Sidebar card alignment.

Phase 2: Core flows
- Compose page and submit states.
- Topic detail and reply composer.
- Login/register surfaces.
- Profile surfaces.

Phase 3: Node behavior
- Category pages and active node state.
- Node directory.
- Future user-created node affordances.

Phase 4: Moderation/admin
- Delete, lock, pin, move.
- Chinese confirmation modals.

Phase 5: polish
- Loading skeletons.
- Toasts.
- Empty states.
- Hover/focus/keyboard accessibility.

## 9. Non-goals for This Design Pass

- Rebuild backend logic from scratch.
- Add fake seed content.
- Show unfinished WeChat/SMS provider states in public UI.
- Replace NodeBB admin with a custom admin panel unless required later.

