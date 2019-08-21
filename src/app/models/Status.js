import Sequelize, { Model } from 'sequelize';

class Status extends Model {
  static init(sequelize) {
    super.init(
      {
        title_en: Sequelize.STRING,
        title_pt: Sequelize.STRING,
        is_negative: Sequelize.BOOLEAN,
        notes: Sequelize.STRING,
      },
      {
        tableName: 'status',
        sequelize,
      }
    );

    return this;
  }
}

export default Status;
