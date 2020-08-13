#!/bin/bash

echo "pulling image..."
docker pull mrrs878/dashboard:latest

echo "stopping old app"
docker container stop dashboard

echo "remove old container"
docker container rm dashboard

echo "crete new container"
docker container create --name dashboard -p 8082:80 mrrs878/dashboard:latest

echo "starting new app"
docker container start dashboard

echo "awesome, you succeeded!"
