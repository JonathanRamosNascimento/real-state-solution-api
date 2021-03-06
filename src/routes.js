const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const UserController = require('./controllers/UserController');
const ImmobileController = require('./controllers/ImmobileController');
const MatchController = require('./controllers/MatchController');

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
 *    description: Cadastrar Novo usuário no sistema
 *    parameters:
 *      - in: body
 *        name: User
 *        description: Dados do novo usuário
 *        schema:
 *          $ref: '#/definitions/User'
 *    responses:
 *      '201':
 *        description: Usuário cadastrado com sucesso
 *      '400':
 *        description: Este email já foi cadastrado ou campo obrigatorio
 * definitions:
 *  User:
 *    type: object
 *    required:
 *      - email
 *      - name
 *      - phone
 *      - profile
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      name:
 *        type: string
 *      phone:
 *        type: number
 *      profile:
 *        type: string
 *      password:
 *        type: string
 */
routes.post('/user', UserController.store);

/**
 * @swagger
 * /match:
 *  post:
 *    description: Dar "match" entre o cliente e o imóvel
 *    parameters:
 *      - in: body
 *        name: Match
 *        description: O usuário que não estiver cadastrado deve passar o phone e name e o id do immobile (SOMENTE), já o usuário cadastrado deve passar apenas o seu id do usuario e o id do immobile
 *        schema:
 *          $ref: '#/definitions/Match'
 *    responses:
 *      '201':
 *        description: Match cadastrado com sucesso
 * definitions:
 *  Match:
 *    type: object
 *    required:
 *      - name
 *      - phone
 *      - user
 *      - immobile
 *    properties:
 *      name:
 *        type: string
 *      phone:
 *        type: number
 *      user:
 *        type: string
 *      immobile:
 *        type: string
 */
routes.post('/match', MatchController.store);

/**
 * @swagger
 * /match:
 *  get:
 *    description: Buscar todos matchs no sistema
 *    responses:
 *      '200':
 *        description: Matchs encontrados
 */
routes.get('/match', MatchController.index);

/**
 * @swagger
 * /match/{id}:
 *  get:
 *    description: Buscar Match pelo ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Match ID
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Match encontrado
 *      '404':
 *        description: Match não encontrado
 */
routes.get('/match/:id', MatchController.show);

/**
 * @swagger
 * /login:
 *  post:
 *    description: Fazer login no sistema
 *    parameters:
 *      - in: body
 *        name: UserLogin
 *        description: Usuário para realizar o login
 *        schema:
 *          $ref: '#/definitions/UserLogin'
 *    responses:
 *      '200':
 *        description: Usuário logado com sucesso
 *      '400':
 *        description: Senha invalido ou Usuário não encontrado
 * definitions:
 *  UserLogin:
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

// routes.use(authMiddleware);  // Guardião das rotas

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
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: token
 *    responses:
 *      '201':
 *        description: Imóvel cadastrado com sucesso
 * definitions:
 *  Immobile:
 *    type: object
 *    required:
 *      - tamanho
 *      - quarto
 *      - suite
 *      - banheiro
 *      - piso
 *      - varanda
 *      - garagem
 *      - piscina
 *      - moveisImbutidos
 *      - bairro
 *      - cidade
 *      - estado
 *      - preco
 *      - proprietario
 *      - images
 *    properties:
 *      tamanho:
 *        type: integer
 *      quarto:
 *        type: integer
 *      banheiro:
 *        type: integer
 *      suite:
 *        type: string
 *      piso:
 *        type: string
 *      varanda:
 *        type: string
 *      garagem:
 *        type: number
 *      piscina:
 *        type: string
 *      moveisImbutidos:
 *        type: string
 *      bairro:
 *        type: string
 *      cidade:
 *        type: string
 *      estado:
 *        type: string
 *      preco:
 *        type: integer
 *      proprietario:
 *        type: string
 *      images:
 *        type: array
 *        items:
 *          type: string
 */
routes.post('/immobile', ImmobileController.store);

/**
 * @swagger
 * /immobile/{id}:
 *  get:
 *    description: Buscar Imóvel pelo ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Imóvel ID
 *        schema:
 *          type: string
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: token
 *    responses:
 *      '200':
 *        description: Imóvel encontrado
 *      '404':
 *        description: Imóvel não encontrado
 */
routes.get('/immobile/:id', ImmobileController.show);

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    description: Buscar Usuário por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Usuário ID
 *        schema:
 *          type: string
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: token
 *    responses:
 *      '200':
 *        description: Usuário encontrado
 *      '404':
 *        description: Usuário não encontrado
 */
routes.get('/user/:id', UserController.show);

/**
 * @swagger
 * /user:
 *  get:
 *    description: Buscar todos os Usuários
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: token
 *    responses:
 *      '200':
 *        description: Usuários encontrado
 */
routes.get('/user', UserController.index);

module.exports = routes;