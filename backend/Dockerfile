FROM node:20.10.0-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++ python3 openjdk17
RUN ln -sf /usr/bin/python3 /usr/bin/python
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm","run","dev"]