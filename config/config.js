const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;

types.setTypeParser(1114,function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': 'dpg-ckm2l30710pc73f2dkag-a',
    'port': 5432,
    'database' : 'spenddb',
    'user' : 'spenddb_user',
    'password' : '1lSlbQpJ0DEWAZlktsIORMgbsPmxBxtK'
};

const db = pgp(databaseConfig)

module.exports = db;