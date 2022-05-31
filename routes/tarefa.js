// quando utilizamos um valor com : antes de um texto na rota, criamos uma variável de parâmetro, e essa variável ficará disponível dentro da variável de requisição "req", em req.params.X, nesse caso, req.params.task_id

// método GET retorna o valor
app.get('/tarefa/:task_id', (req, res) => {
  // verifica se o usuário enviou algum valor. Caso negativo, retorno a requisição com uma mensagem
  if (!req.params.task_id) {
    // envio o HTTP STATUS CODE 400 (padrão para requisição inválida)
    // recomenda-se o uso dos padrões de código de resposta ("http status codes" no google")
    res.sendStatus(400);
    // finaliza a execução da minha função utilizando o return.
    // não precisamos retornar nenhum valor, se não é necessário.
    return;
  }

  // crio uma variável e já a transformo em um número, para buscarmos esse número nas posições da variável global "tarefas":
  let task_id = parseInt(req.params.task_id);

  // verifico se é um número válido. Caso negativo, retorno erro.
  // Porém, se o task_id enviado for 0, é considerado falso. Então crio uma validação duplica usando AND (&&) e o OR (||) separados por () para garantir a ordem de comparação.
  // (!task_id && task_id != 0)  =  SE, não tiver task_id (nulo, falso, 0, undefined, "") && task_id for diferente de 0 (nulo, falso, undefined, "")
  // Para testar acesse /tarefa/abc
  if ((!task_id && task_id != 0) || isNaN(task_id)) {
    // envio o HTTP STATUS CODE 400 (padrão para requisição inválida)
    res.sendStatus(400);
    // finaliza a execução da minha função utilizando o return.
    return;
  }

  // se o código executar até aqui, o usuário enviou um número válido.
  // agora precisamos verificar se esse número ainda existe
  // se o typeof de uma posição retornar undefined, o valor não existe
  // Para testar acesse /tarefa/1000000
  if (typeof tarefas[task_id] == 'undefined') {
    // retorno o código 404 de "não encontrado".
    res.sendStatus(404);
    // finalizo a execução da função utilizando o return.
    return;
  }

  // se o código executar até aqui, significa que tudo foi enviado corretamente. Então, retornamos ao usuário a informação requisitada.
  res.send(tarefas[task_id]);
});

// método DELETE deve inserir um valor novo
app.delete('/tarefa/:task_id', (req, res) => {
  // crio uma variável e já a transformo em um número, para buscarmos esse número nas posições da variável global "tarefas":
  let task_id = parseInt(req.params.task_id);

  // verifico se o index existe na lista global
  if (typeof tarefas[task_id] == 'undefined') {
    res.sendStatus(404);
    return;
  }

  // utilizo o método de array splice para remover 1 posição baseado no index (na posição)
  tarefas.splice(task_id, 1);

  // retorno 200 para informar o sucesso
  res.sendStatus(200);
});

// método PUT deve atualizar um valor existente
app.put('/tarefa/:task_id', (req, res) => {
  // retorno o status "não implementado".
  res.sendStatus(501);
});
