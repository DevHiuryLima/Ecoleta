import knex from 'knex';
import path from 'path'; // Bem importante usar essa Libre/Biblioteca quando for lidar com caminho

// O knex recebe um objeto com as configurações do nosso banco de dados.
// A função 'resolve()' ela une caminhos, se passar um pasta 'database', 
// e dentro da mesma um arquivo 'index.js' a funão retornar isso aqui -> 
// 'database/index.js' e ela vai retorna baseado no sistema operacional por exemplo
// no windo a barra é ao contrario. Resumindo ela vai meio que padronizar o
// caminho para acesso a algum arquivo ou pasta.

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')   // o __dirname retorna o caminho/diretorio do arquivo que está executando ele.
        // e dentro desa past eu vou criar um arquivo chamado 'database.sqlite'.
    },
    useNullAsDefault: true,
});

export default connection;

// Migrations == Historico do bacno de dados/Controle de versão do banco de dados