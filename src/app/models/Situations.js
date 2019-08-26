import Sequelize, { Model } from 'sequelize';

class Situations extends Model {
  static init(sequelize) {
    super.init(
      {
        situation_en: Sequelize.STRING,
        situation_pt: Sequelize.STRING,
      },
      {
        tableName: 'situations',
        sequelize,
      }
    );

    return this;
  }
}

export default Situations;
