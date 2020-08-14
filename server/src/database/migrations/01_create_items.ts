import Knex from 'knex';

// Serve para realizar as alterações necessarias no banco.
export async function up(Knex: Knex) {
    // CRIAR A TABELA.
    return Knex.schema.createTable('items', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

// Serve para caso a tenha criado alguma coisae errada e 
// precise voltar atras, por isso tem o método down.
// Sempre deve fazer o contrario  do que foi criado com o
// método up.
export async function down(Knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return Knex.schema.dropTable('items');
} 