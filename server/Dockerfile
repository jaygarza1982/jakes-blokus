FROM node:21-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

RUN npx tsc

CMD ["npm", "run", "start"]