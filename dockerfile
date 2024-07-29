FROM node:21-alpine3.18

WORKDIR /

COPY . . 

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000

