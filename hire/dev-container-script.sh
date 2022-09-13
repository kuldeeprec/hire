#!/bin/bash
sudo docker ps
echo "Logging in to docker"
aws ecr get-login-password | sudo docker login --username AWS --password-stdin 360608954462.dkr.ecr.ap-south-1.amazonaws.com/prograd-recruit-dev
echo "Fetching Latest Image"
sudo docker pull 360608954462.dkr.ecr.ap-south-1.amazonaws.com/prograd-recruit-dev:latest
echo "Stopping current container"
sudo docker stop prograd-recruit-dev
echo "Removing old container"
sudo docker rm -f prograd-recruit-dev-old
echo "Rename the stopped container to old"
sudo docker rename prograd-recruit-dev prograd-recruit-dev-old
echo "Starting new container"
sudo docker run --name prograd-recruit-dev -d -p 127.1.1.14:81:5000 360608954462.dkr.ecr.ap-south-1.amazonaws.com/prograd-recruit-dev:latest
echo "Disposing garbage"
sudo docker system prune -af