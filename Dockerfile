FROM node:18.3.0-alpine3.14 as build-stage

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
RUN yarn build && yarn generate

FROM nginx:1.21.1-alpine as production-stage
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
