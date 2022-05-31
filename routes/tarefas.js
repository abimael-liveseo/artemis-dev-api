// método GET retorna os valores
app.get('/tarefas', (req, res) => {
  res.send(JSON.stringify(tarefas));
});

// método POST deve inserir um valor novo
app.post('/tarefas', (req, res) => {
  // verifica se recebemos os valores esperados do formulário.

  // podemos saber a quantidade de "chaves" de um objeto utilizando a função Object.keys() que retorna o número total de chaves
  // se nenhum valor foi enviado no body, retorna erro
  if (Object.keys(req.body) == 0) {
    res.sendStatus(400);
    return;
  }

  // caso o valor "Nome" (necessário) não for enviado, retorna erro
  // utilizo a negação com ! para utilizar os valores "falsos" (null, "", 0, undefined, false)
  if (!req.body.nome) {
    res.sendStatus(400).send('Nome é obrigatório');
    return;
  }

  // não valido a descrição, considerando-a útil mas não obrigatória

  // assumindo que tudo está correto, insiro o item na variável global "tarefas"
  tarefas.push(req.body);

  // agora, retorno o sucesso, informando que a requisição deu correto
  res.sendStatus(200);
});
