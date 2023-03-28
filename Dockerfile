FROM node:19.7
WORKDIR /server
COPY package*.json ./
COPY .env ./
# COPY ./package.json ./package.json
# COPY ./public ./public
COPY . .

RUN yarn install
EXPOSE 8080

COPY . .
CMD ["yarn","start"]
# CMD ["yarn","start"]
