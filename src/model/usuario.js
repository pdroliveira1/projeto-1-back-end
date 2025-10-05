const { ObjectId } = require('mongodb');
const { getDb } = require('../banco');
const logger = require('../logger');

class Usuario {
  constructor({ nome }) {
    this.nome = nome;
    this.data_registro = new Date();
  }

  static collection() {
    return getDb().collection('usuarios');
  }

  static async inserir(usuarioInstancia) {
    try {
      const result = await Usuario.collection().insertOne({
        nome: usuarioInstancia.nome,
        data_registro: usuarioInstancia.data_registro
      });
      
      const insertedId = result.insertedId;
      return await Usuario.collection().findOne({ _id: insertedId });
    } catch (err) {
      logger.error('Erro ao inserir usuário:', err);
      throw err;
    }
  }

  static async listar(filtro = {}) {
    try {
      return await Usuario.collection()
        .find(filtro)
        .project({ nome: 1, data_registro: 1 })
        .toArray();
    } catch (err) {
      logger.error('Erro ao listar usuários:', err);
      throw err;
    }
  }

  static async buscarPorId(id) {
    try {
      const _id = new ObjectId(id);
      return await Usuario.collection()
        .findOne({ _id }, { projection: { nome: 1, data_registro: 1 } });
    } catch (err) {
      logger.error('Erro ao buscar usuário por ID:', err);
      throw err;
    }
  }

  /**
   * Atualiza apenas o campo nome de um usuário pelo seu _id.
   * @param {string} id
   * @param {{ nome: string }} dadosAtualizados
   * @returns {Promise<boolean>} true se atualizou 1 documento
   */
  static async atualizarPorId(id, dadosAtualizados) {
    try {
      const _id = new ObjectId(id);
      const updateObj = {};

      if (dadosAtualizados.nome !== undefined) {
        updateObj.nome = dadosAtualizados.nome;
      }

      const res = await Usuario.collection().updateOne(
        { _id },
        { $set: updateObj }
      );
      return res.modifiedCount === 1;
    } catch (err) {
      logger.error('Erro ao atualizar usuário:', err);
      throw err;
    }
  }

  /**
   * Remove um usuário pelo seu _id.
   * @param {string} id
   * @returns {Promise<boolean>} true se removeu 1 documento
   */
  static async removerPorId(id) {
    try {
      const _id = new ObjectId(id);
      const res = await Usuario.collection().deleteOne({ _id });
      return res.deletedCount === 1;
    } catch (err) {
      logger.error('Erro ao remover usuário:', err);
      throw err;
    }
  }
}

module.exports = Usuario;