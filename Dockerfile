FROM  ubuntu:16.04

ENV NODE_VERSION=8.9.1 \
    IONIC_VERSION=3.19.1 \
    CORDOVA_VERSION=7.0.0

WORKDIR /usr/src/app

RUN apt-get update &&  \
    apt-get install -y git curl gcc

COPY ./package*.json .


RUN curl --retry 3 -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" && \
    tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "node-v$NODE_VERSION-linux-x64.tar.gz" && \
    npm install -g cordova@"$CORDOVA_VERSION" && \
    npm install -g ionic@"$IONIC_VERSION" && \
    npm cache clear --force && \
    ionic start myApp sidemenu --no-interactive --no-git --no-link

COPY . .

EXPOSE 8100 35729

