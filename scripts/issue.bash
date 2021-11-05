#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

tag=$(git tag --sort=-creatordate | head -1)
prevTag=$(git tag --sort=-creatordate | head -2 | tail -1)

summary="release $tag - by Simon"
author=$(git show ${tag} | grep Author: | head -1)
date=$(git show ${tag} | grep Date: | head -1)
changelog=$(git log --pretty="%H %s (%an) <br/>" ${prevTag}...${tag} | tr -s "\n" " ")
description="Released by ${author}\n${date}\n\n Changelog:\n<#${changelog}#>"

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
