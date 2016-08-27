# shared-server

## Descripción
Dado que se requiere poseer varios servidores para la descentralización de la administración de datos de uso común de la aplicación, este servidor se encuentre disponible en la nube utilizando como plataforma Heroku (https://www.heroku.com/).
Se entiende por datos de uso común a:
* Listado de skills disponibles
* Listado de posiciones de trabajo disponibles
* Listado de categorías asociadas a las posiciones de trabajo o skills disponibles


Este servidor deberá permitir administrar estos datos utilizando una interfaz gráfica (aplicación web) y a través de un una API para la administración de datos comunes (Restful API).  Este servidor deberá ser implementado utilizando NodeJS (https://nodejs.org) para el desarrollo de la API y angular (https://angularjs.org/) para el desarrollo de la aplicación web. Además se deberá utilizar Postgresql como base de datos (http://www.postgresql.org.es/)

## Instalación

* Instalar NVM (Node Virtual Manager) que permite tener distintas versiones de node.js a través de un simple comando.
https://github.com/creationix/nvm
* node.js v4.5.0
* Ejecutar
```
  npm install
```



## RestAPI

http://rebilly.github.io/ReDoc/?url=https://gist.githubusercontent.com/NickCis/d6a8132a228440c41889b4e0003efc3b/raw/jobify-shared-api.yaml

## Referencias
* NodeJs (https://nodejs.org)
* Angular (https://angularjs.org/)
* Postgres (http://www.postgresql.org.es/)
