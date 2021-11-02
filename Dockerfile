FROM node:14-buster

ADD . /app
WORKDIR /app

ARG git_branch

RUN \
  apt-get update && \
  apt-get -y install yarn && \
  apt-get -y install git && \
  git checkout $git_branch && \
  yarn build
