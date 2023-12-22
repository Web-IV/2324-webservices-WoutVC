# Examenopdracht Web Services

- Student: Wout Van Cleemput
- Studentennummer: 202181098
- E-mailadres: wout.vancleemput@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten

# Om deze applicatie te starten moet je deze gegevens in de .env zetten:

NODE_ENV=development
DATABASE_HOST="vichogent.be"
DATABASE_PORT=40043
DATABASE_USERNAME="181098wv"
DATABASE_PASSWORD="cIDBHyRfGx1GspVWsase"

# Als je een fout krijgt dat er een module niet gevonden is dan kan je al deze commando's uitvoeren:
- yarn add koa
- yarn add nodemon --dev
- yarn add config
- yarn add env-cmd
- yarn add @koa/router
- yarn add koa-bodyparser
- yarn add @koa/cors
- yarn add yamljs
- yarn add swagger-ui-react swagger-ui
- yarn add koa-static
- yarn add swagger-jsdoc koa2-swagger-ui
- yarn add koa-router


## Testen

- yarn test
