const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const UserController = require('./controllers/UserController');
const ImmobileController = require('./controllers/ImmobileController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Real State Solution API',
      description: 'API so sistema de gerencimento de alugues e vendas de imoveis Real State Solution',
      contact: {
        name: 'Jonathan Ramos'
      },
      servers: ['https://realstatesolution.herokuapp.com/']
    }
  },
  apis: ['src/routes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /user:
 *  post:
 *    description: Rota para criar novo usuário
 *    responses:
 *      '201':
 *        description: Usuário criado com sucesso
 *      '401':
 *        description: Token invalido
 */
routes.post('/user', UserController.store);

/**
 * @swagger
 * /login:
 *  post:
 *    description: Fazer login no sistema
 *    parameters:
 *      - in: body
 *        name: User
 *        description: Usuário para realizar o login
 *        schema:
 *          $ref: '#/definitions/User'
 *    responses:
 *      '200':
 *        description: Usuário logado com sucesso
 *      '400':
 *        description: Senha invalido ou Usuário não encontrado
 * definitions:
 *  User:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 */
routes.post('/login', UserController.login);

routes.use(authMiddleware);  // Guardião das rotas

/**
 * @swagger
 * /immobile:
 *  get:
 *    description: Listar os imoveis cadastrados conforme os parametros
 *    parameters:
 *      - in: query
 *        name: tamanho
 *        schema:
 *          type: integer
 *        description: O tamanho minimo em m² do imóvel
 *      - in: query
 *        name: quarto
 *        schema:
 *          type: integer
 *        description: Quantidade de quartos do imóvel
 *      - in: query
 *        name: banheiro
 *        schema:
 *          type: integer
 *        description: Quantidade de banheiros do imóvel
 *      - in: query
 *        name: piso
 *        schema:
 *          type: string
 *        description: Tipo de piso do imóvel
 *      - in: query
 *        name: varanda
 *        schema:
 *          type: string
 *        description: Tem varanda? sim/não
 *      - in: query
 *        name: garagem
 *        schema:
 *          type: string
 *        description: Tem garagem? sim/não
 *      - in: query
 *        name: piscina
 *        schema:
 *          type: string
 *        description: Tem piscina? sim/não
 *      - in: query
 *        name: moveisImbutidos
 *        schema:
 *          type: string
 *        description: Tem moveis imbutidos? sim/não
 *      - in: query
 *        name: areaTanque
 *        schema:
 *          type: string
 *        description: Tem area para tanque? sim/não
 *      - in: query
 *        name: sala
 *        schema:
 *          type: string
 *        description: Tem sala? sim/não
 *      - in: query
 *        name: cozinha
 *        schema:
 *          type: string
 *        description: Tem cozinha? sim/não
 * 
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: token
 */
routes.get('/immobile', ImmobileController.index);

/**
 * @swagger
 * /immobile:
 *  post:
 *    description: Cadastrar novo imóvel no sistema
 *    parameters:
 *      - in: body
 *        name: Immobile
 *        description: Dados do novo imóvel
 *        schema:
 *          $ref: '#/definitions/Immobile'
 *    responses:
 *      '201':
 *        description: Imóvel cadastrado com sucesso
 * definitions:
 *  Immobile:
 *    type: object
 *    required:
 *      - tamanho
 *      - quarto
 *      - banheiro
 *      - piso
 *      - varanda
 *      - garagem
 *      - piscina
 *      - moveisImbutidos
 *      - areaTanque
 *      - sala
 *      - cozinha
 *      - proprietario
 *    properties:
 *      tamanho:
 *        type: integer
 *      quarto:
 *        type: integer
 *      banheiro:
 *        type: integer
 *      piso:
 *        type: string
 *      varanda:
 *        type: string
 *      garagem:
 *        type: string
 *      piscina:
 *        type: string
 *      moveisImbutidos:
 *        type: string
 *      areaTanque:
 *        type: string
 *      sala:
 *        type: string
 *      cozinha:
 *        type: string
 *      proprietario:
 *        type: string
 */
routes.post('/immobile', ImmobileController.store);

module.exports = routes;