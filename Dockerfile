FROM node:alpine

WORKDIR /app

ARG API_SITE_URL

COPY package.json yarn.lock /app/
RUN yarn

COPY . /app
RUN yarn cs && yarn build

CMD yarn start
