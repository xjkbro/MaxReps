FROM node:19.7
WORKDIR /server
COPY package*.json ./
COPY .env ./
# COPY ./package.json ./package.json
# COPY ./public ./public
COPY . .

RUN yarn install
RUN yarn --cwd ./client install
RUN yarn --cwd ./client build
EXPOSE 8080

# COPY . .
CMD ["yarn","start"]
# CMD ["yarn","start"]
