FROM node:22.15.0-alpine3.21

WORKDIR /app

# dev dependencies
RUN apk add --no-cache bash curl

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]