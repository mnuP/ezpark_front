# Establecer la imagen base
FROM node:16

# Establecer el directorio de trabajo en la imagen de Docker
WORKDIR /app

# Copiar los archivos del paquete.json y paquete-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto 5000 para Vite
EXPOSE 5173

# Comando para iniciar la aplicación
CMD [ "npm", "run", "serve" ]

#sapo perro hp