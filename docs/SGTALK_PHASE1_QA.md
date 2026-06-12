# SGTALK Phase 1 QA

Updated: 2026-06-12

## Shipped In This Pass

- Round 2 mobile/profile polish:
  - Reworked user profile pages from a dashboard-like layout into a compact forum profile with real avatar, small identity block, contribution tabs, recent public content, and a V2EX-style information table.
  - Localized account topic/reply pages so `Topics`, `Posts`, `Recent`, `Best`, and `Controversial` no longer leak into public UI.
  - Replaced NodeBB's default topic sort and reply button partials with compact Chinese controls: `排序`, `从旧到新`, `从新到旧`, `按赞排序`, `回复主题`, and `登录后回复`.
  - Made mobile guest/sidebar cards less promotional by hiding the large illustration, suppressing empty `今日热议` and `社区状态` cards, and keeping hot-node navigation compact.
  - Tightened mobile header and node rail behavior: opaque header, right fade affordance, hidden guest post shortcut on the rail, and smaller nav spacing.
  - Increased desktop theme-toggle hit target and improved dark-mode muted text contrast.
- Rebuilt the global desktop frame to a stable `1280px` shell with `1fr + 300px` content/sidebar grid.
- Restored topic detail layout after schema metadata nodes were occupying CSS grid slots.
- Highlighted the current node on topic detail pages using `page-topic-category-*` body classes.
- Changed guest `未登录` from a button-like pill into quiet status text.
- Removed the hard mobile node-rail arrow and kept a soft fade with extra right padding.
- Tightened compose page width from `1060px` to `960px`.
- Reduced compose textarea initial height and kept JS autosize active.
- Added compose submit feedback: empty-title inline warning, busy state, recovery after failure.
- Replaced the faux Google `G` with an inline multi-colour Google mark.
- Pulled the currently deployed live theme back from `/opt/stacks/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex` so GitHub reflects production.
- Replaced the header image logo with a CSS text wordmark; the previous uploaded logo asset was a marked-up design sheet.
- Removed public footer technology/source text.
- Moved the right sidebar widget source into `widgets/global-sidebar.html` and deployed it through `scripts/apply-sgtalk-widgets.sh`.
- Removed fake sidebar coin/favourite/check-in counters from the public widget.
- Fixed the theme `staticDirs` mapping so NodeBB no longer warns about an invalid mapped path.

## Verified

- Round 2 live Playwright matrix passed after deployment:
  - Desktop and mobile user profile pages have no horizontal overflow and no console or HTTP errors in the tested route set.
  - Mobile user profile now shows recent public content near the top instead of a large stats dashboard.
  - Mobile home/topic sidebars no longer show the large guest illustration or empty `今日热议`/`社区状态` cards.
  - Topic pages expose localized `排序` controls and no longer render the old English sort labels in the tested HTML.
  - Account pages expose only forum-useful tabs: `主页`, `主题`, and `回复`.
  - Raw widget markup can still contain hidden/sidebar class names, but Playwright visible-text checks found no public prompt/demo/provider residue.
- Post-audit core matrix passed 20/20 on 2026-06-12 after the latest deploy.
- Header node shortcuts use the real live category IDs: `问与答=5`, `新移民=6`, `安家租房=7`, `职业与薪资=8`, `金融税务=9`, `育儿与学校=10`, `本地生活=12`, `交通出行=13`, `交易=16`.
- Guest header no longer exposes hidden logged-in labels in rendered body text.
- Dead palette/theme-customisation button was removed; light/dark toggle remains.
- Invalid register submit now shows visible Chinese field errors and a visible summary alert.
- Guest reply/upvote actions redirect to login before calling protected APIs.
- Dark mode keeps primary CTAs red and profile section headings readable.
- Login/register Google OAuth entry remains visible.
- Login "保持登录状态" renders as a clear checkbox.
- Profile/default avatars now preserve real image URLs when present and fall back to a restrained initials avatar.
- Guest top-bar and list post links now say `登录后发帖` and carry `next=/compose?cid=5`, so login preserves the compose intent.
- Topic/category labels now use the SGTALK lightweight node label and no longer render the broken-looking `? 问与答`.
- Login empty submit now shows field-level Chinese errors without a server round trip.
- Register empty submit, bad email, short password, empty confirmation, and mismatched confirmation all show field-level Chinese errors.
- Mobile auth inputs, primary submit buttons, Google OAuth buttons, reply/upvote controls, and guest post entry meet practical touch-target sizing.
- NodeBB build completed successfully after each deployment.
- Public site returns HTTP 200.
- No Playwright console errors or HTTP >= 400 errors in the tested flows.
- No horizontal overflow on desktop or mobile.
- Topic title click opens topic detail.
- Guest post entry opens login.
- Login and register pages render.
- Topic in `问与答` appears under `问与答`, not under unrelated nodes.
- Container logs show NodeBB's `url.parse` deprecation warning and the existing `nodebb-plugin-emoji-android` compatibility warning; neither was introduced by this theme pass.
- `git diff --check` passes.
- Live HTML contains the SGTALK wordmark and clean sidebar copy.
- Live HTML no longer contains `Powered by NodeBB`, `Inspired by`, `logo_icon.png`, fake coin labels, or fake check-in text.
- Playwright desktop and mobile smoke tests reported no console errors and no horizontal overflow.
- Final matrix on live site covered desktop `1440x900`, wide `1920x1080`, and mobile `390x844` for home, `问与答`, topic detail, user profile, login, and register. All returned `200`, had no horizontal overflow, no broken node label text, and no public Supabase/OAuth-provider/demo residue.

## Latest Evidence

- `output/playwright/round2-after/audit.json`
- `output/playwright/round2-final/audit.json`
- `output/playwright/round2-final/mobile-light-home.png`
- `output/playwright/round2-final/mobile-light-user.png`
- `output/playwright/round2-final/mobile-dark-topic.png`
- `output/playwright/round2-final/desktop-light-user.png`
- `output/playwright/final-desktop-home.png`
- `output/playwright/final-mobile-home.png`
- `output/playwright/final-mobile-user.png`
- `output/playwright/after-register-touch-fixed.png`
- `output/playwright/after-mobile-topic-fixed.png`
- `output/playwright/final-matrix.json`

## Screenshot Evidence

- `/tmp/sgtalk-phase1-final/desktop-home.png`
- `/tmp/sgtalk-phase1-final/mobile-home.png`
- `/tmp/sgtalk-phase1-final/desktop-topic.png`
- `/tmp/sgtalk-phase1-final/mobile-topic.png`
- `/tmp/sgtalk-phase1-final/login-google-final.png`
- `/tmp/sgtalk-github-handoff-desktop.png`
- `/tmp/sgtalk-github-handoff-mobile.png`
- `/tmp/sgtalk-register-invalid-fixed.png`
- `/tmp/sgtalk-mobile-home-final.png`
- `/tmp/sgtalk-dark-user-avatar-final.png`

## Still To Do

- Split page composer and dynamic NodeBB composer into explicit style boundaries.
- Replace NodeBB default topic toolbar with a compact V2EX-style topic control row.
- Override post row template for true V2EX-style avatar/content/floor/footer structure.
- Hide mobile topic-list `最后回复` text to keep rows denser.
- Make homepage default post target configurable instead of hard-coded `cid=5`.
- Re-test logged-in compose/reply/like/delete flows in an authenticated browser session or with a temporary QA account.
- The NodeBB username/group availability checks still use `HEAD` requests where 404 means "available"; this can appear as console noise during registration typing even though the user-facing form now shows proper validation.
- Decide whether to delete or rewrite the current public test-looking topic `发一个帖子试试`; it is live user content, so it was not removed by code.
- Review NodeBB dependency audit output and the `nodebb-plugin-emoji-android` compatibility warning before a larger public launch.
