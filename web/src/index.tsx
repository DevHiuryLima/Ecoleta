import React from 'react';
import ReactDOM from 'react-dom'; //Quando importa o react-dom eu falo pro react que estou usando o react na web
// e quero que o react se integre com a dom
import App from './App';

// Pega o react importado e chama o metodo random
// dizendo que eu quero que renderize(render) o meu 'app'
// dentro do meu root ( document.getElementById('root) )
// dentro do meu 'app' teria o h1 Hello World
// e tudo que eu troco lá automaticamente ele muda
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
