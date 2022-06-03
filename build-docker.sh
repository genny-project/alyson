BRANCH_TO_BUILD=$1

if [ -z $BRANCH_TO_BUILD ]; then
	echo "Usage: $0 <branch>"
	exit 1
fi

docker build -t gennyproject/alyson:${BRANCH_TO_BUILD}  .
docker tag gennyproject/alyson:${BRANCH_TO_BUILD} gennyproject/alyson:latest
 
#docker push gennyproject/alyson:${BRANCH_TO_BUILD}
#docker push gennyproject/alyson:latest
 
#docker rmi gennyproject/alyson:${VERSION_TO_BUILD}
#docker rmi gennyproject/alyson:latest
