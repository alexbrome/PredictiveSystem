# Etapa 1: construir la app Angular
# Etapa 1: build de Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

# Etapa 2: servir con Nginx
FROM nginx:1.28.0
# Copiamos la carpeta browser que contiene los archivos del build
COPY --from=build /app/dist/winepredictive-front/browser /usr/share/nginx/html

# Eliminamos el default.conf de nginx y usamos el nuestro
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

