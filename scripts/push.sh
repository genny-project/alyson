#!/bin/bash
if [ -z "${1}" ]; then
   version="latest"
else
   version="${1}"
fi
docker push gennyproject/alyson-v9:"${version}"
docker tag  gennyproject/alyson-v9:"${version}" gennyproject/alyson-v9:latest
docker push gennyproject/alyson-v9:latest