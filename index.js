// instancia (carrega/lê) a biblioteca express (instalada no package.json. "npm init; npm install express")
const express = require('express');

// inicia o express
const app = express();

// digo para o javascript cadastrar uma variável chamada "app" de forma global, para ser utilizada em qualquer arquivo da aplicação.
global.app = app;
// digo também para criar uma variável global que controlará os itens criados/exibidos/removidos das nossas rotas, simulando um banco de dados. Nesse exemplo, utilizaremos nas rotas da pasta "routes"
global.tarefas = [];

// instancia (carrega/lê) a biblioteca de caminhos nativa PATH
const path = require('path');
// instancia (carrega/lê) a biblioteca de arquivos nativa FS
const fs = require('fs');

// crio uma constante com a porta a ser utilizada pelo express
const port = 3010;

// utilizo a função .use e a .static para informar ao express um diretório para arquivos estáticos (imagem, js, css que vão pro navegador)
app.use(express.static('static'));

// incluo o pacote body-parser (que melhora a experiência com o body de requisições POST, PUT).
// para utilizar mais esse pacote, instalamos no nosso projeto com "npm install --save body-parser"
const bodyParser = require('body-parser');
// agora utilizo esse "middleware" conforme os padrões da documentação do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// "normaliza" o caminho do diretório para buscar os arquivos
let normalizedPath = path.join(__dirname, 'routes');
// console.log(__dirname, normalizedPath); // descomente para ver os valores antes e depois.

// instancio uma variável para inserir as rotas lidas automaticamente da pasta "routes", logo abaixo.
let routes = {};

// lê o diretório completo e utiliza o require de arquivos locais (iniciados com .) para inserir no objeto "rotas"
fs.readdirSync(normalizedPath).forEach(function (file) {
  // para cada arquivo da pasta, insere o retorno do arquivo numa posição da variável routes
  routes[file] = require('./routes/' + file);
});

// crio a rota principal / (para não utilizar um arquivo sem nome)
app.get('/', (req, res) => {
  // envio o arquivo com um formulário para inserir novos itens
  res.sendFile(path.resolve('pages/index.html'));
});

// digo para o express (iniciado na constante app) a começar a "ouvir" as requisições http na porta configurada.
app.listen(port, () => {
  // exibo uma mensagem no console informando ao desenvolvedor que a aplicação está iniciada.
  console.log(`Aplicativo ouvindo em: http://localhost:${port}`);
});
