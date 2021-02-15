#!/bin/bash

if [ -z "${1}" ]; then
   version="latest"
else
   version="${1}"
fi


docker push gennyproject/alyson:"${version}"
docker tag  gennyproject/alyson:"${version}" gennyproject/alyson:latest
docker push gennyproject/alyson:latest

