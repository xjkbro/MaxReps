FROM node:19.7
WORKDIR /server/client
COPY package*.json ./
# COPY .env ./
# COPY ./package.json ./package.json
COPY . .
# COPY ./src ./src
RUN yarn install --force
EXPOSE 3000

RUN yarn global add serve
CMD ["serve","-s","build"]
