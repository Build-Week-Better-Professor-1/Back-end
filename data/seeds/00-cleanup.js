exports.seed = async function (knex) {
  await knex("messages").truncate();
  await knex("projects").truncate();
  await knex("students").truncate();
  await knex("users").truncate();
};
