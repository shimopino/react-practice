FROM node

RUN apt-get update && apt-get install -y curl git vim

WORKDIR /home/app

ENV NODE_ENV=development

EXPOSE 3000