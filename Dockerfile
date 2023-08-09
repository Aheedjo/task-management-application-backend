FROM node:12

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

ENV PORT=3050

EXPOSE 3050

CMD [ "npm", "start" ]