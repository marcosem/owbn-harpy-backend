import Sequelize, { Model } from 'sequelize';

class StatusPosition extends Model {
  static init(sequelize) {
    super.init(
      {
        position_id: Sequelize.INTEGER,
        status_id: Sequelize.INTEGER,
      },
      {
        tableName: 'status_position',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Relationships:
    this.belongsTo(models.Positions, {
      foreignKey: 'position_id',
      as: 'position',
    });
    this.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status' });
  }
}

export default StatusPosition;
