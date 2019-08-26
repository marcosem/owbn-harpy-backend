import Sequelize, { Model } from 'sequelize';

class StatusMember extends Model {
  static init(sequelize) {
    super.init(
      {
        member_id: Sequelize.INTEGER,
        status_id: Sequelize.INTEGER,
        giver: Sequelize.STRING,
        reason: Sequelize.STRING,
        date: Sequelize.DATEONLY,
        is_removed: Sequelize.BOOLEAN,
        date_removed: Sequelize.DATEONLY,
        reason_removed: Sequelize.STRING,
      },
      {
        tableName: 'status_member',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Relationships:
    this.belongsTo(models.Members, { foreignKey: 'member_id', as: 'member' });
    this.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status' });
  }
}

export default StatusMember;
