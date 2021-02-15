#!/bin/bash
project='alyson'
branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
commit_hash=$(git rev-parse HEAD)

if [ -z "${1}" ]; then
  version="latest"
else
  version="${1}"
fi

# build docker imges
echo "Git branch:" "${branch}"
echo "Last git commit hash:" "${commit_hash}"

FILE=Dockerfile.dev
parent=`dirname $PWD`
if test -f "$FILE"; then
    echo "docker build -t gennyproject/${project}:"${version}" -f Dockerfile.dev ."
    docker build -t gennyproject/${project}:"${version}" -f Dockerfile.dev .
else
    echo "docker build -t gennyproject/${project}:"${version}" -f ${parent}/Dockerfile.dev ${parent}"
    docker build -t gennyproject/${project}:"${version}" -f ${parent}/Dockerfile.dev ${parent}
fi

#clean up
image_ids=$(docker images | grep ${project} | grep none)
if [ "${image_ids:-0}" == 0 ]; then
  echo 'Skip clean up'
else
  docker images | grep ${project} | grep none | awk '{print $3}' | xargs docker rmi
fi
