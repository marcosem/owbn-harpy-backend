import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Logins extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // a field that doesn't exist in DB
        password_hash: Sequelize.STRING,
        is_st: Sequelize.BOOLEAN,
        super_user: Sequelize.BOOLEAN,
      },
      {
        tableName: 'logins',
        sequelize,
      }
    );

    // Interrupt the user saving and crypt the password
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    // Relationships:
    this.belongsTo(models.Members, { foreignKey: 'member_id', as: 'member' });
    this.belongsTo(models.Domains, { foreignKey: 'domain_id', as: 'domain' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Logins;
