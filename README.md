# GoopBack

Este projeto foi criado usando:

- Node: 22.12.0
- Nest JS: 11.0.1
- Package Manager: npm 10.9.0
- Database: MySQL

## Primeiro passo

**Obs: Inicie seu servidor MySQL antes de rodar o projeto**

Instale as dependencias do projeto usando:

```
npm install
```

OU

```
yarn install
```

## Segundo passo

Pegue o arquivo **.envexample** encontrado na raíz do projeto e renomeie para **.env**, com isso você vai iniciar as variáveis de ambiente.

Dentro do **.env** coloque as instruções de acesso ao banco de dados:

```
DATABASE_URL="mysql://{usuariodobanco}:{senhadobanco}@localhost:3306/goop"
```

**Obs: Se a porta do seu mysql não for 3306 substitua para não haver conflitos na aplicação.**

## Terceiro passo

No terminal apontando para a raíz do projeto, rode as migrates para criar a estrutura do banco:

```
npx prisma migrate dev 
```

## Quarto passo

Rode o servidor:

```
npm run start
```
OU
```
yarn start
```