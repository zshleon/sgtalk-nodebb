# SGTALK NodeBB Handoff

Updated: 2026-06-07

## What This Is

SGTALK is now based on NodeBB, not the older custom Next.js/Supabase prototype.

The current work is a NodeBB theme/customization stack focused on a V2EX-style, node-first forum UI for Singapore Chinese newcomers.

## Important Paths

- Durable local project copy: `/Users/jingwazhu/Documents/CODEX/sgtalk-nodebb`
- Previous temporary work copy: `/tmp/sgtalk-nodebb-work`
- Live server stack: `/opt/stacks/sgtalk-nodebb`
- Live site: `https://sgtalk.zshstc.org`
- Custom theme: `themes/nodebb-theme-sgtalk-v2ex`
- Latest QA note: `docs/SGTALK_PHASE1_QA.md`
- UI blueprint: `docs/SGTALK_V2EX_UI_BLUEPRINT.md`
- Design board: `docs/sgtalk-v2ex-design-board.html`

## Server Access

Use the existing SSH key:

```sh
ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@100.106.234.127
```

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

From the local project:

```sh
rsync -az --delete -e "ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519" \
  /Users/jingwazhu/Documents/CODEX/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex/ \
  root@100.106.234.127:/opt/stacks/sgtalk-nodebb/themes/nodebb-theme-sgtalk-v2ex/
```

Then rebuild NodeBB assets and restart:

```sh
ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@100.106.234.127 \
  'cd /opt/stacks/sgtalk-nodebb && docker compose exec -T nodebb bash -lc "cd /usr/src/app && ./nodebb build --config=/opt/config/config.json" && docker compose restart nodebb'
```

## Verify After Deploy

Minimum checks:

```sh
curl -I -L --max-time 12 https://sgtalk.zshstc.org/
ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519 root@100.106.234.127 \
  'cd /opt/stacks/sgtalk-nodebb && docker compose logs --since=5m nodebb | grep -Ei "uncaught|exception|fatal|EADDR|failed|error" || true'
```

Expected log note:

- NodeBB may print a `url.parse` deprecation warning. That is not a current app failure.

## Current Phase 1 Status

Already shipped:

- Stable desktop frame with `1280px` shell and `1fr + 300px` grid.
- Topic detail layout fixed.
- Current node highlighting on topic pages.
- Mobile node rail fade cleanup.
- Quiet guest auth state.
- Tighter compose page and textarea autosize.
- Compose submit warning and busy/recovery behavior.
- Multi-colour Google icon on login.

See `docs/SGTALK_PHASE1_QA.md` for screenshot evidence and verified flows.

## Next Work

Highest-priority structural work:

1. Split page composer and dynamic NodeBB composer into explicit style boundaries.
2. Replace NodeBB default topic toolbar with a compact V2EX-style control row.
3. Override post row template for true V2EX-style avatar/content/floor/footer structure.
4. Hide mobile topic-list `最后回复` text to keep rows denser.
5. Make homepage default post target configurable instead of hard-coded `cid=5`.
6. Re-test logged-in compose with a real logged-in browser session or a temporary QA account.

## Handoff Prompt For Another AI

Use this prompt:

```text
You are taking over SGTALK, a NodeBB-based forum at https://sgtalk.zshstc.org. Do not work on the older custom Next.js/Supabase prototype. The durable local project is /Users/jingwazhu/Documents/CODEX/sgtalk-nodebb and the live server stack is /opt/stacks/sgtalk-nodebb on root@100.106.234.127 using ssh -o HostKeyAlias=10.0.0.50 -i ~/.ssh/id_ed25519.

Read HANDOFF.md, docs/SGTALK_PHASE1_QA.md, and docs/SGTALK_V2EX_UI_BLUEPRINT.md first. Keep secrets, .env, mongo data, nodebb runtime data, and backups out of git. Work mainly in themes/nodebb-theme-sgtalk-v2ex.

The next priority is structural theme quality: split page composer vs dynamic composer styles, replace the default topic toolbar, and make post rows match V2EX-style avatar/content/floor/footer layout. After edits, rsync the theme to the server, run NodeBB build, restart nodebb, then verify with browser screenshots and logs.
```
