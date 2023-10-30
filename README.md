# Proyecto Angular y Express

Este proyecto combina Angular y Express para crear una aplicación web. A continuación, se describen los pasos para instalar y ejecutar este proyecto en tu computadora.

## Requisitos previos

Asegúrate de tener Node.js y npm (el administrador de paquetes de Node.js) instalados en tu computadora. Puedes descargarlos desde [nodejs.org](https://nodejs.org/). Se recomienda instalar la versión LTS.

Asegúrate de tener instalado Git, puedes descargarlo desde https://git-scm.com/. se recomienda instalar la opción:  Standalone Installer

## Nota

Antes de continuar con los pasos de instalación espera a que Node.js y git sean instalados.

## Pasos de instalación

1.  **Clona el repositorio:**

    Abre tu terminal o línea de comandos y ejecuta el siguiente comando para clonar este repositorio:

    git clone https://github.com/Villegas-06/easy_media_test.git

2.  **Accede al directorio del proyecto:**

    Ve al directorio del proyecto que acabas de clonar y escribe el siguiente comando:

    cd easy_media_test

    2.1. **Accede a la carpeta del backend:**

        Luego de haber ejecutado el paso anterior dirigete a la carpeta del backend y escribe el siguiente comando:

        cd back

    2.2. **Instala las dependencias del servidor Express:**

        Ejecuta el siguiente comando para instalar las dependencias del servidor Express:

        npm install

    2.3. **Inicia el servidor de Express:**

        Ejecuta el siguiente comando para iniciar el servidor Express:

        node server.js

        El servidor Express se ejecutará en http://localhost:3000.

3.  **Accede al front del proyecto:**

    En otra terminal ve al directorio del proyecto que acabas de clonar y escribe el siguiente comando:

    cd easy_media_test

    3.1 **Accede a la carpeta del frontend:**

        Luego de haber ejecutado el paso anterior dirigete a la carpeta del frontend y escribe el siguiente comando:

        cd front

    3.2 **Instala las dependencias del cliente Angular:**

        Ejecuta el siguiente comando para instalar las dependencias de Node:

        npm install

    3.3 **Añade angular:**

        Ejecuta el siguiente compando para instalar las dependencias de angular

        npm i -g angular@/cli

    3.3 **Inicia la aplicación Angular:**

        Ejecuta el siguiente comando para iniciar el servidor Angular:

        ng serve

        La aplicación Angular estará disponible en http://localhost:4200.

# Uso

Puedes acceder a la aplicación web visitando http://localhost:4200 en tu navegador. El servidor Express se encarga de las API y la aplicación Angular maneja la interfaz de usuario.
