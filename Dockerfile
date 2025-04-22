FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
Run npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]

