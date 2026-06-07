# SGTALK Phase 1 QA

Updated: 2026-06-07

## Shipped In This Pass

- Rebuilt the global desktop frame to a stable `1280px` shell with `1fr + 300px` content/sidebar grid.
- Restored topic detail layout after schema metadata nodes were occupying CSS grid slots.
- Highlighted the current node on topic detail pages using `page-topic-category-*` body classes.
- Changed guest `未登录` from a button-like pill into quiet status text.
- Removed the hard mobile node-rail arrow and kept a soft fade with extra right padding.
- Tightened compose page width from `1060px` to `960px`.
- Reduced compose textarea initial height and kept JS autosize active.
- Added compose submit feedback: empty-title inline warning, busy state, recovery after failure.
- Replaced the faux Google `G` with an inline multi-colour Google mark.

## Verified

- NodeBB build completed successfully after each deployment.
- Public site returns HTTP 200.
- No Playwright console errors or HTTP >= 400 errors in the tested flows.
- No horizontal overflow on desktop or mobile.
- Topic title click opens topic detail.
- Guest post entry opens login.
- Login and register pages render.
- Topic in `问与答` appears under `问与答`, not under unrelated nodes.
- Container logs show only NodeBB's `url.parse` deprecation warning.

## Screenshot Evidence

- `/tmp/sgtalk-phase1-final/desktop-home.png`
- `/tmp/sgtalk-phase1-final/mobile-home.png`
- `/tmp/sgtalk-phase1-final/desktop-topic.png`
- `/tmp/sgtalk-phase1-final/mobile-topic.png`
- `/tmp/sgtalk-phase1-final/login-google-final.png`

## Still To Do

- Split page composer and dynamic NodeBB composer into explicit style boundaries.
- Replace NodeBB default topic toolbar with a compact V2EX-style topic control row.
- Override post row template for true V2EX-style avatar/content/floor/footer structure.
- Hide mobile topic-list `最后回复` text to keep rows denser.
- Make homepage default post target configurable instead of hard-coded `cid=5`.
- Re-test logged-in compose in the user's Chrome session once Chrome control is available, or with a temporary QA account.
