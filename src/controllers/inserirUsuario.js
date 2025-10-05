const { connect, close } = require('../banco');
const Usuario = require('../model/usuario');
const logger = require('../logger');

async function inserirUsuarios() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (inserirUsuarios)');

    // Defina aqui os usuários que quer inserir:
    const u1 = new Usuario({ nome: 'Pedro Augusto' });
    const u2 = new Usuario({ nome: 'WILLIAN MASSAMI WATANABE' });
    const usuario1 = await Usuario.inserir(u1);
    const usuario2 = await Usuario.inserir(u2);

    logger.info(
      'Usuários inseridos:',
      usuario1._id.toString(),
      usuario2._id.toString()
    );
  } catch (err) {
    logger.error('✗ Erro em inserirUsuarios:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

inserirUsuarios();