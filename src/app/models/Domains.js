import Sequelize, { Model } from 'sequelize';

class Domains extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        main_city: Sequelize.STRING,
      },
      {
        tableName: 'domains',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Relationships:
    this.belongsTo(models.Files, {
      foreignKey: 'domain_picture',
      as: 'picture',
    });
  }
}

export default Domains;
