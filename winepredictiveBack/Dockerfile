# Usa una imagen base de Java
FROM openjdk:17-jdk-alpine

# Copia el jar de la aplicación
COPY target/winepredictive-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto (por ejemplo, 8080)
EXPOSE 8080

# Ejecuta la aplicación
ENTRYPOINT ["java", "-jar", "/app.jar"]
