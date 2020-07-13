
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --silent

RUN npm install pm2 -g 

RUN npm run build

COPY . /usr/src/app

EXPOSE 3005

CMD ["pm2-runtime", "dist/index.js"]
