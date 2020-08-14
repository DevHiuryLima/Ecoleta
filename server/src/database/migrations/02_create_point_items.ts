import Knex from 'knex';

// Serve para realizar as alterações necessarias no banco.
export async function up(Knex: Knex) {
    // CRIAR A TABELA.
    return Knex.schema.createTable('point_items', table =>{
        table.increments('id').primary();
        table.integer('point_id').notNullable().references('id').inTable('points');
        table.integer('item_id').notNullable().references('id').inTable('items');
    });
}

// Serve para caso a tenha criado alguma coisae errada e 
// precise voltar atras, por isso tem o método down.
// Sempre deve fazer o contrario  do que foi criado com o
// método up.
export async function down(Knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return Knex.schema.dropTable('point_items');
}