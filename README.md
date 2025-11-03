# PredictiveSystem
Predictive wine quality system with phyton, angular and spring

-La base de datos se llama db y Spring se conectará a jdbc:mysql://db:3306/....

He puesto MYSQL_ROOT_PASSWORD=root para que el contenedor MySQL acepte una contraseña (más seguro que vacía). Spring usa root como contraseña (vía SPRING_DATASOURCE_PASSWORD).

El frontend se sirve por NGINX en el contenedor en puerto 80, mapeado a 4200 local. Puedes cambiar 4200:80 por 80:80 si quieres usar el puerto 80.

Cypress está en perfil e2e, así no arranca por defecto. Cuando quieras ejecutarlo con docker compose --profile e2e up -d se crea el contenedor; para lanzar tests manualmente podrás docker compose run --rm cypress npx cypress run o ejecutar docker exec -it wine_cypress npx cypress run.

-----------------------CONSTRUIR Y LEVANTAR SIN CYPRESS--------------------------

cd PredictiveSystem
docker compose build frontend --no-cache
docker compose up -d
docker compose up --build -d

-------------------------VER LOGS----------------------------------------
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db


Accede desde el navegador a http://localhost:4200 (frontend). Las llamadas a /api/... las proxeará NGINX a backend:8081.

---------------------PARA EJECUTAR CYPRESS MANUALMENTE:---------------------------

Levanta el contenedor de Cypress (sin ejecutar tests ):

docker compose --profile e2e up -d

----------------------EECUTA TEST DENTRO DEL CONTENEDOR------------------------------

docker exec -it wine_cypress npx cypress run --config baseUrl=http://host.docker.internal:4200



