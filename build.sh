#!/bin/bash
quasar build
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 989041579659.dkr.ecr.ap-northeast-1.amazonaws.com
docker build -t annoying-orange/ecp-farms .
docker tag annoying-orange/ecp-farms:latest 989041579659.dkr.ecr.ap-northeast-1.amazonaws.com/wesport/ecp-farms:latest
docker push 989041579659.dkr.ecr.ap-northeast-1.amazonaws.com/wesport/ecp-farms:latest