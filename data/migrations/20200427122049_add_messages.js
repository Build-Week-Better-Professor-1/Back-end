exports.up = function (knex) {
  return knex.schema.createTable("messages", (tbl) => {
    tbl.increments();
    tbl.string("title", 128).notNullable();
    tbl.string("body", 8192).notNullable();
    tbl.integer("user_id").unsigned().notNullable().references("users.id");
    tbl.integer("student_id").unsigned().references("students.id");
    tbl.datetime("time_to_send").notNullable();
    tbl.boolean("sent").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
