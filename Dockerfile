FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install nodemon -g
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npx", "nodemon", "src/index.js"]
