import Sequelize, { Model } from 'sequelize';

class Files extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const fullPath =
              this.type === 'none' ? this.path : `${this.type}/${this.path}`;

            return `${process.env.APP_URL}/files/${fullPath}`;
          },
        },
      },
      {
        tableName: 'files',
        sequelize,
      }
    );

    return this;
  }
}

export default Files;
