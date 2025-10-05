const { connect, close } = require('../banco');
const Video = require('../model/video');
const logger = require('../logger');

async function inserirVideo() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (inserirVideo)');

    // Defina aqui os produtos que quer inserir:
    const p1 = new Video({
      titulo: 'como programar',
      descricao: 'neste video iremos ensinar como programar',
    });
    const p2 = new Video({
      titulo: 'gameplay de zelda',
      descricao: 'neste video iremos jogar zelda',
    });

    const prod1 = await Video.inserir(p1);
    const prod2 = await Video.inserir(p2);

    logger.info(
      'Videos inseridos:',
      prod1._id.toString(),
      prod2._id.toString()
    );
  } catch (err) {
    logger.error('Erro em inserirVideo:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

inserirVideo();