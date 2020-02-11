const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authComplete = 'Bearer ' + authHeader;

  if (!authComplete)
    return res.status(401).send({ error: 'O token não foi informado!' });

  const parts = authComplete.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token incorreto' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, process.env.SECRET_API, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalido!' });

    req.userId = decoded.id;
    return next();
  })
};