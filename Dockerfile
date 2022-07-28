FROM node:16

WORKDIR /usr/app

COPY package.json ./
COPY tsconfig-api.json ./

COPY src/api ./src/api

RUN ls -a
RUN npm install

EXPOSE 6060

CMD ["npm", "run", "api-start"]


