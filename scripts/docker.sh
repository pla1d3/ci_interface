#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

# ---
OAUTH_TOKEN="AQAAAAAWrUaIAAd5OsDgtlQt6kfepZdg5aw2E5o"
ORG_ID="6461097"
# ---

tag=$(git tag | sort -r | head -n1)

docker build .
