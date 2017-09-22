FROM node:alpine

WORKDIR /code

COPY package.json ./

RUN apk add --update yarn

COPY package.json yarn.lock ./
RUN yarn global add webpack
RUN yarn install

COPY . .