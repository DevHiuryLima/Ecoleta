import express from 'express';  //import express, { response, request } from 'express'; 
import cors from 'cors'; 
import path from 'path';  //import express, { response, request } from 'express'; 
import routes from './routes';
import { errors } from 'celebrate'


// Quando a gente usando TypeScript na nossa aplicação as bibliotecas
// elas precisam vir com não apenas o código da biblioteca mas também 
// com a definição de tipos da biblioteca. Essa definção de tipos traz 
// para a gente, para o nosso editor as informações de todas as opções 
// que eu tenho aqui dentro do express, todas as funções, quais são os 
// parametros que elas recebem, quais são os os retornos que essas fuções 
// dão e tudo relacionado a tipagem do express. Algumas bibliotecas já vem 
// isso, outras separam em duas  bibliotecas o codigo e a definição de 
// tipos em outra. O express como apareceu os três pontinhos já sabe-se 
// que el faltou a definção  de tipos e mostra o que precisa instalar
// "npm intall @types/express" usando o menos D que vai ser usado somente 
// em desenvolvimento quando estiver em produção não vou precisar da 
// biblioteca de definição de tipos.

// No video o Diego coloca ts-node src/server.ts
// No grupo para arrumar foi iss: 
//   "scripts": {
//     "dev": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"
//   },

// Request obtem dados da nossa requisição que está acontecendo na aplicação.
// Ex: se fosse uma rota de criação de usuario. Dentro do request estaria 
// os dados do usuario nome, email, senha...
// Response serve para devolver uma resposta para o browser oi qualque outra
// aplicação que esteja consumindo essa rota.

// Rota: Endereço completo da requisição.
// Recurso: Qual entidade estamos acessando do sistema.

// Tipos de parametros
// Request param: Parâmetros que vem na própia rota que identificam um recurso.
// toda vez que prescisar manipula um recurso especifico.

// Query Param: São parametros que são opicionais que serve para filtrar e
// fazer paginação. Utilizados somente  na rota exemplo: localhost:3333/users?serach=el

// Request body: É o corpo da requisição. São paramentros para criação/atualização de informações.

// const app = express();

// O use serve para colocar como se fosse um plugin no express, para colocar 
// uma funcionalidade a mais dentro dele.
// app.use(express.json());

// const users = [
//     'Diego',
//     'Hiury',
//     'Cleusmar',
//     'sergior',
//     'Daniel'
// ];

// app.get('/users', (request, response)=>{
//     //console.log('Listagem de usuarios')
//     //response.send('Hello World')
//     const search = String(request.query.search);
    
//     const filtredUsers = search ? users.filter(users => users.includes(search)) : users;

//     return response.json(filtredUsers)
// });

// // Os dois pontos (:) significa que aeu vou receber um parametro
// // que vai ser acessivel depois na  requisição.
// app.get('/users/:id', (request, response)=>{
//     //Pego o id passado na url.
//     const id = Number(request.params.id);

//     const user = users[id];

//     return response.json(user); 

// })


// app.post('/users', (request, response)=>{
//     const data = request.body;

//     const users = {
//         name: data.name,
//         email: data.email
//     };
    
//     return response.json(users);
// })

// app.listen(3333);

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);