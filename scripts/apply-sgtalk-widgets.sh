#!/usr/bin/env bash
set -euo pipefail

ROOT="${ROOT:-/opt/stacks/sgtalk-nodebb}"
WIDGET_HTML="${1:-$ROOT/widgets/global-sidebar.html}"
MONGO_CONTAINER="${MONGO_CONTAINER:-sgtalk-nodebb-mongo}"

if [[ ! -f "$ROOT/.env" ]]; then
  echo "Missing $ROOT/.env" >&2
  exit 1
fi

if [[ ! -f "$WIDGET_HTML" ]]; then
  echo "Missing widget file: $WIDGET_HTML" >&2
  exit 1
fi

cd "$ROOT"
set -a
# shellcheck disable=SC1091
. "$ROOT/.env"
set +a

tmp="/tmp/sgtalk-global-sidebar.html"
docker cp "$WIDGET_HTML" "$MONGO_CONTAINER:$tmp"

docker compose exec -T mongo mongosh --quiet \
  -u "$MONGO_ROOT_USER" \
  -p "$MONGO_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  nodebb \
  --eval "
const fs = require('fs');
const html = fs.readFileSync('$tmp', 'utf8');
const sidebar = JSON.stringify([{ widget: 'html', data: { html, title: '', container: '' } }]);
db.objects.updateOne(
  { _key: 'widgets:global' },
  { \$set: { sidebar } },
  { upsert: true }
);
print('widgets:global sidebar updated');
"

docker compose restart nodebb
