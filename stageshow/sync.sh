#!/bin/sh
# Copies the stageshow kit and the OnPay scenes from the stageshow skill repo,
# so this repo builds on its own. Usage: pnpm stageshow:sync [path-to-stageshow]
set -e
SRC="${1:-../../benjitaylor-skills/stageshow}"
DIR="$(dirname "$0")"
mkdir -p "$DIR/examples"
rsync -a --delete "$SRC/kit/" "$DIR/kit/"
for d in onpay-look onpay-dashboard onpay-expert; do rsync -a --delete "$SRC/examples/$d/" "$DIR/examples/$d/"; done
cp "$SRC/LICENSE" "$SRC/NOTICE.md" "$DIR/"
