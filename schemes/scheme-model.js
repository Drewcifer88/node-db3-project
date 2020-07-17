const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove,
};

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where("id", id).first();
}

function findSteps(id) {
    return db("steps as st")
        .where("schems_id", id)
        .join("schemes as sc")
        .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
        .orderBy("st.step_number");
}

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then((ids) => {
            return findById(ids[0])
        })
}

function addStep(stepData, id) {
    return db("steps")
        .insert(stepData, "id")
        .then((ids) => {
            return findById(ids[0])
        });
}

function update(changes, id) {
    return db("schemes as sc")
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        });
}

function remove(id) {
    return db("schemes as sc").where({ id }).del();
}
