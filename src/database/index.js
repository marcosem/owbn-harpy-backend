import Sequelize from 'sequelize';

import Status from '../app/models/Status';
import Positions from '../app/models/Positions';
import StatusPosition from '../app/models/StatusPosition';
import Files from '../app/models/Files';
import Clans from '../app/models/Clans';
import Domains from '../app/models/Domains';
import Situations from '../app/models/Situations';
import Members from '../app/models/Members';
import StatusMember from '../app/models/StatusMember';
import databaseConfig from '../config/database';

const models = [
  Status,
  Positions,
  StatusPosition,
  Files,
  Clans,
  Domains,
  Situations,
  Members,
  StatusMember,
];

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
