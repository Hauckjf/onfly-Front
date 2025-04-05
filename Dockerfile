FROM node:18-alpine as dev
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM nginx:alpine as prod
COPY --from=dev /app/dist /usr/share/nginx/html
EXPOSE 80