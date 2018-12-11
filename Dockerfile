FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY . .

ENV DB_USER=${DB_USER} \
    DB_NAME=${DB_NAME} \
    DB_PASSWORD=${DB_PASSWORD}

EXPOSE 3000

CMD ["npm", "start"]