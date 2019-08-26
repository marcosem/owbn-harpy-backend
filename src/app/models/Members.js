import Sequelize, { Model } from 'sequelize';

class Members extends Model {
  static init(sequelize) {
    super.init(
      {
        kindred_name: Sequelize.STRING,
        mortal_name: Sequelize.STRING,
        email: Sequelize.STRING,
        note: Sequelize.STRING,
        genre: Sequelize.INTEGER,
        genre_en: {
          type: Sequelize.VIRTUAL,
          get() {
            switch (this.genre) {
              case 1:
                return 'male';
              case 2:
                return 'female';
              default:
                return 'unknown';
            }
          },
        },
        genre_pt: {
          type: Sequelize.VIRTUAL,
          get() {
            switch (this.genre) {
              case 1:
                return 'masculino';
              case 2:
                return 'feminino';
              default:
                return 'desconhecido';
            }
          },
        },
      },
      {
        tableName: 'members',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Relationships:
    this.belongsTo(models.Clans, { foreignKey: 'clan_id', as: 'clan' });
    this.belongsTo(models.Members, { foreignKey: 'sire_id', as: 'sire' });
    this.belongsTo(models.Positions, {
      foreignKey: 'position_id',
      as: 'position',
    });
    this.belongsTo(models.Situations, {
      foreignKey: 'situation_id',
      as: 'situation',
    });
    this.belongsTo(models.Domains, { foreignKey: 'domain_id', as: 'domain' });
    this.belongsTo(models.Files, {
      foreignKey: 'member_picture',
      as: 'picture',
    });
  }
}

export default Members;
