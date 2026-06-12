# SGTALK NodeBB Handoff

Updated: 2026-06-12

## What This Is

SGTALK is now based on NodeBB, not the older custom Next.js/Supabase prototype.

The current work is a NodeBB theme/customization stack focused on a V2EX-style, node-first forum UI for Singapore Chinese newcomers.

## Important Paths

- GitHub private repository: `https://github.com/zshleon/sgtalk-nodebb`
- Local working copy: `/Users/jingwazhu/Documents/Codex/sgtalk-nodebb`
- Google Drive copy: not used for code. Google Drive rejected writes to the previous `sgtalk-nodebb` folder, so GitHub is now the canonical code handoff source.
- Live server stack: `/opt/stacks/sgtalk-nodebb`
- Live site: `https://sgtalk.zshstc.org`
- Custom theme: `themes/nodebb-theme-sgtalk-v2ex`
- Runtime widget source: `widgets/global-sidebar.html`
- Latest QA note: `docs/SGTALK_PHASE1_QA.md`
- UI blueprint: `docs/SGTALK_V2EX_UI_BLUEPRINT.md`
- Design board: `docs/sgtalk-v2ex-design-board.html`

## Server Access

Use the existing SSH key. Current verified route is the LAN address:

```sh
ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@10.0.0.50
```

The old Tailscale address `100.106.234.127` timed out during the latest handoff pass, so prefer `10.0.0.50` while on the home network.

Production stack directory:

```sh
cd /opt/stacks/sgtalk-nodebb
```

## Do Not Commit Or Share

These exist on the server and are intentionally excluded from git:

- `.env`
- `secrets/`
- `mongo/`
- `nodebb/`
- `backups/`

Keep secrets in the server stack or password manager only.

## Deploy Theme Changes

From the local working copy:

```sh
rsync -az --delete -e "ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519" \
  '/Users/jingwazhu/Documents/Codex/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex/' \
  root@10.0.0.50:/opt/stacks/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex/
```

Then rebuild NodeBB assets and restart:

```sh
ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@10.0.0.50 \
  'cd /opt/stacks/sgtalk-nodebb && docker compose exec -T nodebb bash -lc "cd /usr/src/app && ./nodebb build --config=/opt/config/config.json" && docker compose restart nodebb'
```

## Deploy Runtime Widgets

The right sidebar is stored in NodeBB's `widgets:global` database object, not as a theme template. The source copy is kept in git at `widgets/global-sidebar.html`. After editing it:

```sh
rsync -az -e "ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519" \
  '/Users/jingwazhu/Documents/Codex/sgtalk-nodebb/widgets/' \
  root@10.0.0.50:/opt/stacks/sgtalk-nodebb/widgets/

rsync -az -e "ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519" \
  '/Users/jingwazhu/Documents/Codex/sgtalk-nodebb/scripts/apply-sgtalk-widgets.sh' \
  root@10.0.0.50:/opt/stacks/sgtalk-nodebb/scripts/apply-sgtalk-widgets.sh

ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@10.0.0.50 \
  'ROOT=/opt/stacks/sgtalk-nodebb /opt/stacks/sgtalk-nodebb/scripts/apply-sgtalk-widgets.sh'
```

The script reads the server `.env` locally on the server and does not write secrets into git.

## Verify After Deploy

Minimum checks:

```sh
curl -I -L --max-time 12 https://sgtalk.zshstc.org/
ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@10.0.0.50 \
  'cd /opt/stacks/sgtalk-nodebb && docker compose logs --since=5m nodebb | grep -Ei "uncaught|exception|fatal|EADDR|failed|error" || true'
```

Expected log note:

- NodeBB may print a `url.parse` deprecation warning. That is not a current app failure.

## Current Phase 1 Status

Already shipped:

- Round 3 live polish:
  - Guest search no longer feels broken: a search term redirects to login with a visible Chinese context message like `登录后继续搜索：准证`.
  - Bad username/password login now shows a visible Chinese error panel instead of failing silently.
  - `/world` / all-known-topics copy was replaced with SGTALK-facing `全站主题` copy.
  - `/groups` no longer exposes NodeBB's internal `administrators` / moderator groups to the public; it now shows a simple community groups placeholder.
  - Guest homepage/sidebar density was tightened again: hidden promotional hero, hidden empty `今日热议` and `社区状态`, smaller mobile topic rows, and cleaner hot-node card.
  - Desktop, mobile, and dark-mode screenshots were re-verified after deployment.
- Round 2 live polish:
  - User profile pages are now compact forum profiles instead of oversized dashboards.
  - Public user pages show recent content near the top, followed by a V2EX-style account information table.
  - User contribution tabs are reduced to `主页`, `主题`, and `回复`; account topics/replies pages are localized.
  - Topic sort and reply controls are localized and compact.
  - Mobile sidebars no longer show the large guest illustration or empty low-value cards.
  - Mobile header/node navigation is denser and clearer, with a fade affordance and less guest-only clutter.
  - Dark-mode muted text and theme-toggle touch target were improved.
- Latest live theme was pulled back from `/opt/stacks/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex` and committed to GitHub so the repository reflects the actual deployed theme.
- The public sidebar widget source is now tracked at `widgets/global-sidebar.html`; it removes fake coin/favourite counts and uses a text SGTALK mark instead of the old logo screenshot.
- Stable desktop frame with `1280px` shell and `1fr + 300px` grid.
- Topic detail layout fixed.
- Current node highlighting on topic pages.
- Mobile node rail fade cleanup.
- Quiet guest auth state.
- Tighter compose page and textarea autosize.
- Compose submit warning and busy/recovery behavior.
- Multi-colour Google icon on login.
- Header node shortcuts now point to the real live NodeBB category IDs instead of stale hard-coded IDs.
- Invalid registration now shows visible Chinese field errors and a summary alert.
- Guest reply/upvote actions redirect to login before protected API calls.
- Dark mode keeps primary CTAs red and profile section headings readable.
- The dead palette button was removed; the reliable light/dark toggle remains.
- Public avatars preserve real image URLs when present and otherwise use a restrained initials fallback.
- Guest post entry is now explicit: visitors see `登录后发帖`, and post links carry `next=/compose?cid=5` so login preserves intent.
- Topic/category labels now use a lightweight SGTALK node label instead of NodeBB's default label markup, removing the broken-looking `? 问与答`.
- Login/register now use field-level Chinese validation for empty required fields and mismatched passwords.
- Mobile auth controls and topic reply/upvote controls were raised to practical touch-target sizes.
- Post-audit Playwright live matrix passed across desktop `1440x900`, wide `1920x1080`, and mobile `390x844`.
- Round 2 Playwright live checks passed for mobile/desktop user pages, mobile home, and mobile dark topic detail with no horizontal overflow, no console/HTTP errors, and no visible prompt/demo/provider residue.

See `docs/SGTALK_PHASE1_QA.md` for screenshot evidence and verified flows.

## Next Work

Highest-priority structural work:

1. Split page composer and dynamic NodeBB composer into explicit style boundaries.
2. Replace NodeBB default topic toolbar with a compact V2EX-style control row.
3. Override post row template for true V2EX-style avatar/content/floor/footer structure.
4. Make homepage default post target configurable instead of hard-coded `cid=5`.
5. Re-test logged-in compose/reply/like/delete flows with a real logged-in browser session or a temporary QA account.
6. If direct typed `/compose?cid=5` should preserve intent, add a server-side redirect hook; clicked guest entry already preserves compose intent.
7. Decide whether to delete or rewrite the current public test-looking topic `发一个帖子试试`; it is live user content, so code changes did not remove it.
8. Review the existing NodeBB dependency audit output and the `nodebb-plugin-emoji-android` compatibility warning before a larger public launch.
9. If registration console cleanliness becomes important, replace or suppress NodeBB's username/group availability `HEAD` checks where 404 currently means "available".

## Handoff Prompt For Another AI

Use this prompt:

```text
You are taking over SGTALK, a NodeBB-based forum at https://sgtalk.zshstc.org. Do not work on the older custom Next.js/Supabase prototype. The canonical code repository is https://github.com/zshleon/sgtalk-nodebb and the local working copy is /Users/jingwazhu/Documents/Codex/sgtalk-nodebb. The live server stack is /opt/stacks/sgtalk-nodebb on root@10.0.0.50 using ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519.

Read HANDOFF.md, widgets/global-sidebar.html, docs/SGTALK_PHASE1_QA.md, and docs/SGTALK_V2EX_UI_BLUEPRINT.md first. Keep secrets, .env, mongo data, nodebb runtime data, and backups out of git. Work mainly in themes/nodebb-theme-sgtalk-v2ex. Do not use the previous Google Drive folder as the source of truth; GitHub is canonical.

The latest deployed pass fixed guest search context, visible login errors, public groups exposure, `/world` copy, and mobile/sidebar density. The next priority is structural theme quality: split page composer vs dynamic composer styles, replace the default topic toolbar, make post rows match V2EX-style avatar/content/floor/footer layout, and re-test real logged-in compose/reply/like/delete with an authenticated session. After edits, rsync the theme to the server, run NodeBB build, restart nodebb, then verify with browser screenshots and logs.
```
