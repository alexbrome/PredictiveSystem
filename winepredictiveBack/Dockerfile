# ---------- BUILD STAGE ----------
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /build

# Copiamos pom.xml y descargamos dependencias primero (mejora caché)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Ahora copiamos el código fuente
COPY src ./src

# Compila el proyecto sin ejecutar tests
RUN mvn clean package -DskipTests

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Instalar netcat (netcat-openbsd suele estar disponible)
RUN apt-get update \
    && apt-get install -y netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copia el jar resultante
COPY --from=build /build/target/winepredictive-0.0.1-SNAPSHOT.jar app.jar
COPY entrypoint.sh /app/entrypoint.sh

# Permitir ejecución
RUN chmod +x /app/entrypoint.sh
# Exponer el puerto del backend
EXPOSE 8081

# Comando de arranque
ENTRYPOINT ["/app/entrypoint.sh"]
#ENTRYPOINT ["java", "-jar", "/app/app.jar"]
