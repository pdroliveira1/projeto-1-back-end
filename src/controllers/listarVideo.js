const { connect, close } = require('../banco');
const Video = require('../model/video');
const logger = require('../logger');

async function listarVideos() {
  try {
    await connect();
    logger.info('✔ Conectado ao MongoDB (listarVideos)');

    const videos = await Video.listar();
    console.table(videos);
  } catch (err) {
    logger.error('Erro em listarVideos:', err);
  } finally {
    await close();
    process.exit(0);
  }
}

listarVideos();