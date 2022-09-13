# Stage 1
FROM node:12.10.0-alpine AS BUILD_IMAGE
LABEL AUTHOR="gokul@prograd.org"
WORKDIR /app

ARG ENV=dev
# RUN echo $ENV
ENV NODE_ENV=$ENV

RUN mkdir client;
RUN mkdir server;

# COPY Package.json files first then copy rest files for better caching
COPY ./client/package.json ./client
RUN cd client && \
    npm install && \
    npm audit fix

COPY ./server/package.json ./server
RUN cd server && \
    npm install

# Copy Rest files
COPY . ./

RUN cd client && \
   if [ "$ENV" = "dev" ]; then npm run build-dev ; elif [ "$ENV" = "staging" ]; then npm run build-staging ; else npm run build ; fi

RUN  ls && cd client/build && find . -type f -exec  sed -i  "s#static/#statics/#g" {} + && mv static statics

# Remove unnecessary files from client folder
RUN mkdir clients;
RUN mv client/build clients;
RUN rm -rf client;
RUN mv clients client;

#Stage 2 build
FROM node:12.10.0-alpine
LABEL AUTHOR="gokul@prograd.org"
WORKDIR /app
RUN apk add --no-cache git && \
    apk add --no-cache chromium && \
    npm install i -g pm2

ARG ENV=dev
RUN echo $ENV
ENV NODE_ENV=$ENV
COPY --from=BUILD_IMAGE /app/client ./client
COPY --from=BUILD_IMAGE /app/server ./server

EXPOSE 5000
CMD [ "pm2-runtime","server/ecosystem.config.js" ]