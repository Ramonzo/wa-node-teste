
# WA-DEV-TEST
### Teste
* Construir uma API para manutenção de laboratórios e exames.
---
### Feito Com
-	Node.js
-	Express.js
-	Mongoose
-	MongoDB
-	Nodemon
---
### Contexto
Desenvolvi uma aplicação para as seguintes situações:

**Laboratório:**
* cadastrar um novo laboratório;
* obter uma lista de laboratórios ativos;
* atualizar um laboratório existente;
* remover logicamente um laboratório ativo.

**Exames:**
* cadastrar um novo exame;
* obter uma lista de exames ativos;
* atualizar um exame existente;
* remover logicamente um exame ativo.

**Associação:**
* associar um exame ativo à um laboratório ativo;
* desassociar um exame ativo de um laboratório ativo;

**Importante:**
* Um exame pode estar associado a mais de um laboratório;
* O cadastro de um laboratório/exame é considerado ativo;
* Exames e laboratórios recebem um `id` gerado automaticamente.

---
### Informações
**Laboratório:**
- nome
- endereço
- status [ativo, inativo]

**Exame:**
- nome
- tipo [analise clinica, imagem]
- status [ativo, inativo]

---
**Funcionalidades Extras**
- Endpoint que faz a busca por nome do exame e retorna todos os laboratórios associados a esse exame.
- Possibilidade de executar em lote:
    - Labs:
        - cadastro
        - atualização
        - remoção
    - Exams:
        - cadastro
        - atualização
        - remoção

----
## Documentação
O projeto foi desenvolvido utilizando em ambiente de desenvolvimento o Nodemon para fazer watch.

Vou utilizar npm nessa documentação, mas você pode utilizar yarn ou outro gestor de dependências de sua preferência.

## Primeiros Passos

- Primeiro vamos clonar o repositório
```sh
git clone https://github.com/Ramonzo/wa-node-teste.git
```
- Após clonar vamos executar o comando dentro do projeto:
 ```sh
npm install
```

- Caso deseje pode instalar o Nodemon.
```sh
npm install nodemon
```

- Agora vamos utilizar os seguintes comandos:
```sh
npm run dev
```
ou
```sh
npm start
```
O primeiro comando é para executar o script do Nodemon e observar suas alterações.
O segundo comando precisará ser executado manualmente a cada alteração salva, caso você não instale o Nodemon.

---
## Rotas
Antes de começar verifique se sua API está conectada utilizando a rota root da aplicação.

### Laboratórios
Aqui vamos manuzear nossas rotas que envolvem os laboratórios.

#### Cadastro
- Endpoint: \
``
POST: /lab/register
``

- Valor esperado: \
``
	{
		"name": "LabTeste",
		"address":"Meu Lindo Endereço, 42, Teste, TE"
	}
`` \
Você também pode enviar um array de objetos de mesma estrutura. Assim a API tratará todos em lote.

- Códigos de erro:
	- error: 0x1 \
		Um erro na query. A query pode não ter aceitado os valores informados.
	- error: 0x2 \
		A API não conseguiu finalizar o processo, provavelmente um erro interno ou de execução.
		
#### Atualização
- Endpoint: \
``
PUT: /lab/update
``

- Valor esperado: \
``
	{
		"name": "LabTeste",
		"address":"Meu Lindo Endereço, 42, Teste, TE"
	}
`` \
Você também pode enviar um array de objetos de mesma estrutura. Assim a API tratará todos em lote.

- Códigos de erro:
	- error: 011 \
		Algum dos registros informados falhou ao ser inserido.
	- error: 012 \
		Provavelmente um erro interno ou de execução.
	- error: 001 \
		A API não conseguiu armazenar o dado informado.
	- error: 002 \
		Provavelmente um erro interno ou de execução.

#### Remoção
- Endpoint: \
``
DELETE: /lab/remove
``
- Valor esperado: \
``
	{
		"id": "mongoose.Type.ObjectId"
	}
`` \
Você também pode enviar um array de objetos de mesma estrutura. Assim a API tratará todos em lote.

- Códigos de erro:
	- error: 011 \
		Algum dos registros informados falhou ao ser inserido.
	- error: 012 \
		Provavelmente um erro interno ou de execução.
	- error: 001 \
		A API não conseguiu armazenar o dado informado.
	- error: 002 \
		Provavelmente um erro interno ou de execução.

#### Busca
- Endpoint: \
devolve todos os laboratórios cadastrados: \
``
GET: /lab
``
ou devolve um laboratório específico por Id \
``
POST: /lab
``

- Valor esperado: \
``sh
	{
		"id": "mongoose.Type.ObjectId"
	}
``

- Códigos de erro:
	- error: 001 \
		Um erro na query. Provavelmente um erro de implementação ou o Id informado não está correto.
	- error: 002 \
		Muito similar ao erro acima. A API não conseguiu processar a solicitação.
---
### Exames
Aqui vamos manuzear nossas rotas que envolvem os exames.
#### Cadastro
- Endpoint: \
``
POST: /exam/register
``

- Valor esperado: \
``
	{
		"name": "Sangue",
		"type":"Análise Clínica"
	}
`` \
Você também pode enviar um array de objetos de mesma estrutura. Assim a API tratará todos em lote.

- Códigos de erro:
	- error: 0x1 \
		Um erro na query. A query pode não ter aceitado os valores informados.
	- error: 0x2 \
		A API não conseguiu finalizar o processo, provavelmente um erro interno ou de execução.
		
#### Atualização
- Endpoint: \
``
PUT: /exam/update
``

- Valor esperado: \
``
	{
		"name": "Sangue",
		"type":"Análise Clínica"
	}
`` \
Você também pode enviar um array de objetos de mesma estrutura. Assim a API tratará todos em lote.

- Códigos de erro:
	- error: 011 \
		Algum dos registros informados falhou ao ser inserido.
	- error: 012 \
		Provavelmente um erro interno ou de execução.
	- error: 001 \
		A API não conseguiu armazenar o dado informado.
	- error: 002 \
		Provavelmente um erro interno ou de execução.

#### Remoção
- Endpoint: \
``
DELETE: /exam/remove
``
- Valor esperado:
``
	{
		"id": "mongoose.Type.ObjectId"
	}
`` \
Você também pode enviar um array de objetos de mesma estrutura. Assim a API tratará todos em lote.

- Códigos de erro:
	- error: 011 \
		Algum dos registros informados falhou ao ser inserido.
	- error: 012 \
		Provavelmente um erro interno ou de execução.
	- error: 001 \
		A API não conseguiu armazenar o dado informado.
	- error: 002 \
		Provavelmente um erro interno ou de execução.

#### Busca
- Endpoint \
devolve todos os exames cadastrados: \
``
GET: /exam
``
ou devolve um exame específico por Id \
``
POST: /exam
``

- Valor esperado: \
`` \
	{
		"id": "mongoose.Type.ObjectId"
	}
``

- Códigos de erro:
	- error: 001 \
		Um erro na query. Provavelmente um erro de implementação ou o Id informado não está correto.
	- error: 002 \
		Muito similar ao erro acima. A API não conseguiu processar a solicitação.

#### Associações [Exame x Laboratório]
- Endpoint \
para associar \
``
PUT: /exam/associate
``  \
para dessassociar \
``
PUT: /exam/desassociate
``

- Valor esperado: \
`` \
	{
		"examId": "mongoose.Type.ObjectId",
        "labId": "mongoose.Type.ObjectId"
	}
``

- Códigos de erro:
	- error: 001 \
		A API não conseguiu utilizar o Id de exame para buscar um exame antes de associar.
	- error: 002 \
		A API não conseguiu processar os exames. Provavelmente um erro interno ou de implementação.
    - error: 003 \
        A API não conseguiu utilizar o Id de laboratório para associar o exame.
    - error: 004 \
        A API não conseguiu processar. Provavelmente um erro interno ou de implementação.

#### Pesquisa
- Endpoint:  \
devolve todos os exames cadastrados: \
``
GET: /exam/search/lab
``  \

- Valor esperado:  \
``
	{
		"name": "Sangue"
	}
``

- Códigos de erro:
	- error: 001 \
		Um erro na query. Não conseguiu trabalhar com o valor informado.
	- error: 002 \
		A API encontrou um erro ao buscar os laboratórios associados.
    - error: 003 \
        Provavelmente um erro interno ou de implementação.


---
### Informações da Documentação
- Códigos de erro independentes de rota: \

	1. Os erros possuem uma regra de leitura numérica.
	
	2. Caso o erro seja 00n ele é um erro de ação unitária, apenas um objeto foi enviado na requisição.
	
	3. Quanto o erro for 01n isso significa que a API identificou que você enviou um conjunto de dados e tentou trabalhar em lotes.
	4. Erros: \
		- error: 'request_error'
			Esse erro acontece quando a API identifica alguma inconsistência nos parametros informados, quando um ID não é válido ou quando um valor default não foi informado.

- Respostas da API \
	Toda resposta da API seguem o mesmo padrão de objeto \
	``
	{ error:  '', message:  'Registrados com sucesso.' }
	`` \
	ou quando você espera receber algum dado a resposta pode vir com a key `` data `` que pode conter um objeto ou um array de objetos.

- Ambiente de testes: \
	O arquivo ``wa-dev-api.postman_collection.json`` pode ser utilizado para simular o ambiente local utilizando o postman. \
	Caso rode em ambiente local é interessante verificar a Porta e IP do servidor Node local.