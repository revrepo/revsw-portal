#!/bin/bash
#
# Use the script to clear production cache for portal.revapm.net or portal.nuubit.net.
# Use portal domaine name and real API key as the only parameters of the script.
#


function usage () {
cat <<EOF

usage: $0 DOMAIN_NAME API_KEY

Available options:
      DOMAIN_NAME         - domain name to clean
      API_KEY             - production API key with permissions to purge content for portal.revapm.net
EOF
exit 1
}

if [ -z "$1" -o -z "$2" ]; then
  usage
fi

export PORTAL=$1
export API_KEY=$2

export API_URL="https://api.revapm.net/v1/purge"

# Prepare a temporary JSON file with details of the purge request
JSON_FILE=`mktemp`

( echo '{'
  echo  "\"domainName\":\"$PORTAL\","
  echo  '"purges": ['
  echo  '    {'
  echo  '     "url": {'
  echo  '       "is_wildcard": true,'
  echo  "       \"expression\": \"**\""
  echo  '    }'
  echo  '  }'
  echo  '  ]'
  echo  '}'
) > $JSON_FILE

# Send an API request to purge portal objects
curl -s -H "Authorization: X-API-KEY $API_KEY" -X POST -H "Content-Type: application/json" -T $JSON_FILE $API_URL
