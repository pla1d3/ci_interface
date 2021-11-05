#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

tag=$(git tag | sort -r | head -n1)

docker build . -f ../Dockerfile --build-arg git_branch=$tag

status=""
if [ $? -ne 0 ];
then
  status="build failed"
else
  status="build success"
fi

issueId=$(cat issueId.txt)
comment="Docker image: ${status}"

curl -X POST ${API_URL}/${issueId}/comments \
  -H "Content-Type: application/json", \
  -H "Authorization: OAuth ${OAUTH_TOKEN}" \
  -H "X-Org-Id: ${ORG_ID}" \
  -d '{ "text": "'"${comment}"'" }'

rm -rf issueId.txt
