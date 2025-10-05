const { MongoClient } = require('mongodb');
const logger = require('./logger');

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'back-end1';

let client;
let db;

async function connect() {
  if (db) return db;
  try {
    client = new MongoClient(URI);
    await client.connect();
    db = client.db(DB_NAME);
    logger.info(`Conectado ao MongoDB em "${URI}/${DB_NAME}"`);
    return db;
  } catch (err) {
    logger.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }
}

function getDb() {
  if (!db) {
    const erro = new Error('Banco não conectado. Chame connect() primeiro.');
    logger.error(erro);
    throw erro;
  }
  return db;
}

async function close() {
  if (client) {
    try {
      await client.close();
      logger.info('Conexão com MongoDB encerrada');
    } catch (err) {
      logger.error('Erro ao fechar conexão com MongoDB:', err);
      throw err;
    }
  }
}

module.exports = { connect, getDb, close };