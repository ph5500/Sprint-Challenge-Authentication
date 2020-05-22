const db = require("../database/dbConfig.js");

module.exports = {
    add,
    findBy,
    find
};

function add(user) {
    return db("users").insert(user);
}

function findBy(filter) {
    return db("users")
        .where(filter)
}

function find() {
    return db('users');
}