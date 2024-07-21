FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY .env ./
COPY .env.* ./
COPY tsconfig.* ./
COPY *.ts ./
COPY *.mjs ./
COPY src ./src
COPY public ./public
RUN npm run build

RUN rm tsconfig.*
RUN rm *.ts
RUN rm *.mjs
RUN rm -rf src

EXPOSE 8080

CMD [ "npm", "start" ]
