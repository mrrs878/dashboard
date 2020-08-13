#!/bin/bash

echo "pulling image..."
docker pull mrrs878/blog:latest

echo "stopping old app"
docker container stop blog

echo "remove old container"
docker container rm blog

echo "crete new container"
docker container create --name blog -p 8081:80 mrrs878/blog:latest

echo "starting new app"
docker container start blog

echo "awesome, you succeeded!"
