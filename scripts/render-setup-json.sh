#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT/.env"
OUT="$ROOT/nodebb/setup.json"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

: "${NODEBB_TAG:=4.7}"
: "${NODEBB_MONGO_USER:?missing}"
: "${NODEBB_MONGO_PASSWORD:?missing}"

umask 077
mkdir -p "$(dirname "$OUT")"
docker run --rm -i \
  --env-file "$ENV_FILE" \
  --entrypoint node \
  "ghcr.io/nodebb/nodebb:${NODEBB_TAG}" \
  - <<'JS' > "$OUT"
const fs = require('fs');
const cfg = {
  defaults: {
    mongo: {
      host: 'mongo',
      port: 27017,
      database: 'nodebb',
      username: process.env.NODEBB_MONGO_USER,
      password: process.env.NODEBB_MONGO_PASSWORD
    }
  }
};
process.stdout.write(JSON.stringify(cfg, null, 2) + '\n');
JS

echo "Rendered $OUT"
