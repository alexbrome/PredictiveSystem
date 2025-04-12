# Usa una imagen base con Node.js
FROM node:16 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build -- --prod

# Stage 2: Servir la aplicación usando Nginx
FROM nginx:alpine
COPY --from=build /app/dist/WINEPREDICTIVEFRONT /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
