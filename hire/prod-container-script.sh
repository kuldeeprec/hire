#!/bin/bash
sudo docker ps
echo "Logging in to docker"
aws ecr get-login-password | sudo docker login --username AWS --password-stdin 360608954462.dkr.ecr.ap-south-1.amazonaws.com/prograd-recruit-prod
echo "Fetching Latest Image"
sudo docker pull 360608954462.dkr.ecr.ap-south-1.amazonaws.com/prograd-recruit-prod:latest
echo "Stopping current container"
sudo docker stop prograd-recruit-prod
echo "Removing old container"
sudo docker rm -f prograd-recruit-prod-old
echo "Rename the stopped container to old"
sudo docker rename prograd-recruit-prod prograd-recruit-prod-old
echo "Starting new container"
sudo docker run --name prograd-recruit-prod -d -p 127.1.1.8:81:5000 360608954462.dkr.ecr.ap-south-1.amazonaws.com/prograd-recruit-prod:latest
echo "Disposing garbage"
sudo docker system prune -af