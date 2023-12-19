# Backend Dockerfile
FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
COPY .env ./
RUN npm install
RUN npm run build
EXPOSE 3001
CMD [ "npm", "run", "start:dev" ]