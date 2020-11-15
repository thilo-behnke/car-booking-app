# build stage
FROM node:12 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx/backend.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/dist/booking-client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
