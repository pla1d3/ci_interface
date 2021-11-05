#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

tag=$(git tag | sort -r | head -n1)
prevTag=$(git describe --abbrev=0 --tags $(git rev-list --tags --skip=1 --max-count=1))

summary="release $tag - by Simon"
author=$(git show ${tag} | grep Author: | head -1)
date=$(git show ${tag} | grep Date: | head -1)
changelog=$(git log ${prevTag}...${tag} --oneline -1)
description="Released by ${author}\n${date}\n\n${changelog}"

echo $description

curl -X POST ${API_URL} \
  -H "Content-Type: application/json", \
  -H "Authorization: OAuth ${OAUTH_TOKEN}" \
  -H "X-Org-Id: ${ORG_ID}" \
  -d '{
    "queue": "TMP",
    "summary": "'"${summary}"'",
    "type": "task",
    "description": "'"${description}"'"
  }' | jq -r '.id' > issueId.txt
