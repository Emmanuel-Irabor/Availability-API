FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
#using '. .' means the node_modules will be copied as well. So create a docker ignore file
#and add node_modules there so docker would ignore that.

EXPOSE 8080

CMD [ "node", "server.js" ]