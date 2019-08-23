import Sequelize, { Model } from 'sequelize';

class Clans extends Model {
  static init(sequelize) {
    super.init(
      {
        clan_en: Sequelize.STRING,
        clan_pt: Sequelize.STRING,
        clan_short_name_en: Sequelize.STRING,
        clan_short_name_pt: Sequelize.STRING,
        // clan_logo: Sequelize.INTEGER,
      },
      {
        tableName: 'clans',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Relationships:
    this.belongsTo(models.Files, {
      foreignKey: 'clan_logo',
      as: 'clan_logo_file',
    });
  }
}

export default Clans;
