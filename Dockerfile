FROM node:14.12-alpine

ADD . /app
WORKDIR /app

RUN \
  yarn build
