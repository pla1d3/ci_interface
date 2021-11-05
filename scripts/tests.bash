#!/bin/sh

API_URL="https://api.tracker.yandex.net/v2/issues"

npm run tests 2>tests.txt
testsInfo=$(cat tests.txt | tr -s "\n" " ")
rm -rf tests.txt

issueId=$(cat issueId.txt)

comment="Tests:\n${testsInfo}"
curl -X POST ${API_URL}/${issueId}/comments \
  -H "Content-Type: application/json", \
  -H "Authorization: OAuth ${OAUTH_TOKEN}" \
  -H "X-Org-Id: ${ORG_ID}" \
  -d '{ "text": "'"${comment}"'" }'
