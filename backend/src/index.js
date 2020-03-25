const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/*   Métodos HTTP:
    *GET: Buscar informação do backend
    *POST: Criar uma informação no backend
    *PUT: Alterar uma informação no backend
    *DELETE: Deletar uma informação no backend
*/

/*  Tipos de parâmetros:
    *Query Params: parametros nomeados enviados na  rota após "?" (filtro, paginação)
    *Route Params: parametros utilizados para identificar recursos
    *Request Body: corpo da requisição utilizado para criar ou alterar recursos.
*/

/*
    *SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    *NoSQL: MongoDB, CouchDB
*/

app.listen(3333);