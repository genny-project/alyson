#!/bin/bash
echo "THIS SCRIPT IS FOR RUNNING UNITY LOCALLY"
echo "Clearing existing /public/unity folder"
rm -rf ../public/unity
mkdir ../public/unity
echo "Grabbing latest build files"
cd ../../stt-unity
git pull
cd ..
echo "Copying build files into place"
cp -R stt-unity/UnityData/Build/* alyson/public/unity/
