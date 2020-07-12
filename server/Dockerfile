
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

COPY . /usr/src/app

EXPOSE 3005

CMD ["npm", "start"]