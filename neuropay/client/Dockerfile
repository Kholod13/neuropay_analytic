FROM node:22.11.0-bookworm

ARG DOCKER_USER_NAME
ARG DOCKER_USER_PASSWORD

RUN apt update \
    && apt install -y sudo curl

WORKDIR /frontend/app

ENV PATH ./node_modules/.bin/:$PATH
ENV SHELL /bin/sh

RUN usermod -l $DOCKER_USER_NAME node && \
    usermod -aG sudo $DOCKER_USER_NAME && \
    echo "$DOCKER_USER_NAME:$DOCKER_USER_PASSWORD" | chpasswd

USER $DOCKER_USER_NAME
