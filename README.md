# Aplicación de Monitoreo (NOC)
=============================

Este repositorio contiene una aplicación de monitoreo desarrollada en Node.js TypeScript que verifica periódicamente el estado de los servicios para garantizar su correcto funcionamiento. La aplicación utiliza múltiples métodos de validación y registra toda la información relevante en registros.

## Características principales:
----------------------------

*   **Validación continua:** La aplicación verifica regularmente el estado de los servicios para detectar cualquier interrupción o fallo.
*   **Múltiples sistemas de registro:** Los resultados de las validaciones se registran en sistemas de archivos, MongoDB y PostgreSQL simultáneamente para garantizar la integridad de los datos.
*   **Envío de correos electrónicos:** Se implementa una funcionalidad de correo electrónico que notifica a los administradores sobre eventos críticos y proporciona un archivo de registro adjunto para un análisis detallado.

## Tecnologías utilizadas:
-----------------------

*   Node.js
*   TypeScript
*   FileSystem
*   MongoDB
*   PostgreSQL

## Configuración:
--------------

1.  Clona este repositorio en tu máquina local.
2.  Instala las dependencias utilizando `npm install`.
3.  Configura las variables de entorno según sea necesario.
4.  Ejecuta la aplicación utilizando `npm start`.
