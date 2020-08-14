import Knex from 'knex';

// Serve para realizar as alterações necessarias no banco.
export async function up(Knex: Knex) {
    // CRIAR A TABELA.
    return Knex.schema.createTable('points', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // Certeza que vai ter 2 caracteres por isso o virgula dois.
    });
}

// Serve para caso a tenha criado alguma coisae errada e 
// precise voltar atras, por isso tem o método down.
// Sempre deve fazer o contrario  do que foi criado com o
// método up.
export async function down(Knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return Knex.schema.dropTable('points');
} 