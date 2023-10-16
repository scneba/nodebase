FROM node:14.5-alpine as stage1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . ./

EXPOSE 10107
CMD ["npm", "start"]