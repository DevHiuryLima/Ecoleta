import path from 'path';

// Esse arquivo mesmo sendo do tipo typeScript não podemos 
// usar o 'export defautl' pois o knext não suporta essa sintaxe.
module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')   // o __dirname retorna o caminho/diretorio do arquivo que está executando ele.
        // e dentro desa past eu vou criar um arquivo chamado 'database.sqlite'.
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};