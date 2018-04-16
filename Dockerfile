FROM node:8.5-alpine

MAINTAINER urbit <teknik@urbit.com>

ADD . /code

COPY package.json .
RUN npm install

WORKDIR /code

CMD ["true"]