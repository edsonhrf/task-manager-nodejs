# 💻 **SOBRE O PROJETO**

### Aplicação desenvolvida em Node.js!

A aplicação é utilizada para gerenciar tarefas. Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD das tarefas de cada usuário.

- **Criar uma nova tarefa *(to-do)*;**
- **Listar todas as tarefas *(to-do)*;**
- **Alterar o `title` e `deadline` de uma tarefa *(to-do)** existente;**
- **Marcar uma tarefa *(to-do)* como "feito";**
- **Excluir uma tarefa *(to-do)*;**

Todas as ações são para cada usuário em específico (o `username` será passado pelo header).

# 💻 **ROTAS DA APLICAÇÃO**

### POST `/users`
### GET `/toDos`
### POST `/toDos`
### PUT `/toDos/:id`
### PATCH `/toDos/:id/done`
### DELETE `/toDos/:id`

# 💻 **TESTES**

### **Utilizado *postman* ou *Insomnia* para testar os métodos da aplicação**

### Testes de usuários

- **Should be able to create a new user**
- **Should not be able to create a new user when username already exists**

### Testes de tarefas *(to-dos)*

**Middleware**

Criação de um middleware `checkExistsUserAccount` para verificar se o usuário existe.
**Observação:** O username deve ser enviado pelo header em uma propriedade chamada `username`:

- **Should be able to list all user's todos**
- **Should be able to create a new todo**
- **Should be able to update a todo**
- **Should not be able to update a non existing todo**
- **Should be able to mark a todo as done**
- **Should not be able to mark a non existing todo as done**
- **Should be able to delete a todo**
- **Should not be able to delete a non existing todo**

