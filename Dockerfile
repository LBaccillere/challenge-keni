FROM node:18.12.1-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
