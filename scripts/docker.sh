#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

# ---
OAUTH_TOKEN="AQAAAAAWrUaIAAd5OsDgtlQt6kfepZdg5aw2E5o"
ORG_ID="6461097"
# ---

tag=$(git tag | sort -r | head -n1)

cd ..
docker build . -f Dockerfile --build-arg git_branch=$tag

status=""
if [ $? -ne 0 ];
then
  status="build failed"
else
  status="build success"
fi

cd scripts
issueId=$(cat issueId.txt)
comment="Docker image: ${status}"

curl -X POST ${API_URL}/${issueId}/comments \
  -H "Content-Type: application/json", \
  -H "Authorization: OAuth ${OAUTH_TOKEN}" \
  -H "X-Org-Id: ${ORG_ID}" \
  -d '{ "text": "'"${comment}"'" }'

rm -rf issueId.txt
