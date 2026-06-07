#!/usr/bin/env bash
set -euo pipefail

ROOT="${ROOT:-/opt/stacks/sgtalk-nodebb}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$ROOT/backups/$STAMP"
RETENTION_DAYS="${RETENTION_DAYS:-14}"

cd "$ROOT"
set -a
# shellcheck source=/dev/null
source "$ROOT/.env"
set +a
mkdir -p "$BACKUP_DIR"

docker compose exec -T mongo mongodump \
  --username "$MONGO_ROOT_USER" \
  --password "$MONGO_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --db nodebb \
  --archive \
  --gzip > "$BACKUP_DIR/mongo-nodebb.archive.gz"

tar -C "$ROOT" -czf "$BACKUP_DIR/nodebb-config.tgz" nodebb/config
tar -C "$ROOT" -czf "$BACKUP_DIR/nodebb-uploads.tgz" nodebb/uploads

find "$ROOT/backups" -mindepth 1 -maxdepth 1 -type d -mtime +"$RETENTION_DAYS" -print -exec rm -rf {} +
echo "SGTALK backup complete: $BACKUP_DIR"
