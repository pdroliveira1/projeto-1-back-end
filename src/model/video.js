const { ObjectId } = require('mongodb');
const { getDb } = require('../banco');
const logger = require('../logger');

class Video {

  constructor({ titulo, descricao }) {
    this.titulo = titulo;
    this.descricao = descricao || '';
    this.data_criacao = new Date();
  }

  static collection() {
    return getDb().collection('videos');
  }

  static async inserir(videoInstancia) {
    try {
      const result = await Video.collection().insertOne({
        titulo: videoInstancia.titulo,
        descricao: videoInstancia.descricao,
        data_criacao: videoInstancia.data_criacao
      });
      const insertedId = result.insertedId;
      return await Video.collection().findOne({ _id: insertedId });
    } catch (err) {
      logger.error('Erro ao inserir video:', err);
      throw err;
    }
  }

  static async listar(filtro = {}) {
    try {
      return await Video.collection().find(filtro).toArray();
    } catch (err) {
      logger.error('Erro ao listar videos:', err);
      throw err;
    }
  }

  static async buscarPorId(id) {
    try {
      const _id = new ObjectId(id);
      return await Video.collection().findOne({ _id });
    } catch (err) {
      logger.error('Erro ao buscar video por ID:', err);
      throw err;
    }
  }

  static async atualizarPorId(id, dadosAtualizados) {
    try {
      const _id = new ObjectId(id);
      const updateObj = {};
      if (dadosAtualizados.titulo !== undefined) {
        updateObj.titulo = dadosAtualizados.titulo;
      }
      if (dadosAtualizados.descricao !== undefined) {
        updateObj.descricao = dadosAtualizados.descricao;
      }
      const res = await Video.collection().updateOne(
        { _id },
        { $set: updateObj }
      );
      return res.modifiedCount === 1;
    } catch (err) {
      logger.error('Erro ao atualizar video:', err);
      throw err;
    }
  }

  static async removerPorId(id) {
    try {
      const _id = new ObjectId(id);
      const res = await Video.collection().deleteOne({ _id });
      return res.deletedCount === 1;
    } catch (err) {
      logger.error('Erro ao remover Video:', err);
      throw err;
    }
  }
}

module.exports = Video;