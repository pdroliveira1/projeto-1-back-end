const { connect, close } = require('../banco');
const Usuario = require('../model/Usuario');
const logger = require('../logger');

async function listarUsuarios() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (listarUsuarios)');

    const usuarios = await Usuario.listar();
    console.table(usuarios);
  } catch (err) {
    logger.error('✗ Erro em listarUsuarios:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

listarUsuarios();