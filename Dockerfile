FROM node:21-alpine3.18


# Set working directory
WORKDIR /app

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

# Install Dependencies
COPY package*.json /app/
RUN npm install -g @ionic/cli
RUN npm install 

CMD ["ionic", "serve", "--external"]