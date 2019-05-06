const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    add,
    findBy,
};
  
function find() {
    return db('users');
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function add(dish) {
    return db('users')
        .insert(dish, 'id')
        .then(([id]) => {
            return findById(id);
        });
}

// function find() {
//     return db('users').select('id', 'username', 'password');
// }
  
function findBy(filter) {
    return db('users').where(filter);
}
  

  