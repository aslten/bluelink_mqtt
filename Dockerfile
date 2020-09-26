FROM node:12

WORKDIR /usr/bluelink

COPY package.json ./

RUN npm install

COPY index.js /usr/bluelink/index.js
COPY script.sh /usr/bluelink/script.sh

EXPOSE 1883

CMD ["./script.sh"]
