FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY Back-end/ ./Back-end/

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "Back-end/index.js"]
