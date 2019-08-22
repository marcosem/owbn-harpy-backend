import Sequelize from 'sequelize';

import Status from '../app/models/Status';
import Positions from '../app/models/Positions';
import databaseConfig from '../config/database';

const models = [Status, Positions];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Run the association as well if there is any
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
