import Sequelize, { Model } from 'sequelize';

class Positions extends Model {
  static init(sequelize) {
    super.init(
      {
        position_en: Sequelize.STRING,
        position_pt: Sequelize.STRING,
      },
      {
        tableName: 'positions',
        sequelize,
      }
    );

    return this;
  }
}

export default Positions;
