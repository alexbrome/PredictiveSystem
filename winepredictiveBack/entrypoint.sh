#!/bin/bash
DB_HOST=${SPRING_DATASOURCE_HOST:-db}
DB_PORT=${SPRING_DATASOURCE_PORT:-3306}
MAX_RETRIES=30
COUNT=0

echo "⏳ Esperando a que MySQL en $DB_HOST:$DB_PORT arranque..."
until nc -z $DB_HOST $DB_PORT; do
  COUNT=$((COUNT+1))
  if [ $COUNT -ge $MAX_RETRIES ]; then
    echo "❌ MySQL no respondió después de $MAX_RETRIES intentos, abortando."
    exit 1
  fi
  echo "MySQL no disponible todavía ($COUNT/$MAX_RETRIES)..."
  sleep 2
done

echo "✅ MySQL listo, arrancando aplicación..."
exec java -jar /app/app.jar
