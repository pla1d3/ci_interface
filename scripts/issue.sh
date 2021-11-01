#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

# ---
OAUTH_TOKEN="AQAAAAAWrUaIAAd5OsDgtlQt6kfepZdg5aw2E5o"
ORG_ID="6461097"
# ---

tag=$(git tag | sort -r | head -n1)
prevTag=$(git tag | sort -r | tail -1 | head -n1)

summary="release $tag (by Simon)"
author=$(git show ${tag} | grep Author: | head -1)
date=$(git show ${tag} | grep Date: | head -1)
changelog=$(git log --pretty=format:"%h - %s (%an, %ar)\n" ${prevTag}.${tag})
description="Released by ${author}\n${date}\nChangelog:\n\n${changelog}"

curl -X POST ${API_URL} \
  -H "Content-Type: application/json", \
  -H "Authorization: OAuth ${OAUTH_TOKEN}" \
  -H "X-Org-Id: ${ORG_ID}" \
  -d '{
      "queue": "TMP",
      "summary": "'"${summary}"'",
      "type": "task",
      "description": "'"${description}"'"
  }'
