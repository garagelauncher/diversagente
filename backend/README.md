## Setup

É necessário ter o [docker](https://docs.docker.com/get-docker/) e o [docker-compose](https://docs.docker.com/compose/install/) e o [Node Version Manager](https://github.com/nvm-sh/nvm#about) instalados na sua máquina, ou pelo menos o Node.js (16.x) e uma base de dados MongoDB (4.x).

### 🚀 Como rodar o projeto?

#### Iniciando rápido:

- Copie as variáveis ambientes e rode o comando `npm run docker:dev` e acesse o endpoint `http://localhost:${PORT}/docs`.

#### Novo por aqui ? Siga o passo a passo detalhado:

- Copie o arquivo o arquivo `.env.example` para um novo chamado `.env` e preencha suas variáveis ambientes. Para copiar você pode executar o comando:

```bash
cp .env.example .env
```

> Tenha certeza de no formato da String de conexão do MongoDB `mongodb://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`, você tenha trocado a palavra `HOST` pelo nome do serviço de banco de dados no docker-compose, chamado `database`.

- Para assegurar que caso você tente executar o projeto fora do container localmente, use a mesma versão do Node que o projeto utiliza, antes de rodar um script do projeto, rode o comando:

```bash
nvm use
```

> Caso não conheça o Node Version Manager (NVM), você pode saber mais e baixar para MacOS e Linux por meio desse link [NVM](https://github.com/nvm-sh/nvm#about) e para Windows você pode utilizar o [Nvm For Windows](https://github.com/coreybutler/nvm-windows#overview). Recomende que instale-o com algum gerenciado de pacotes do sistema operacional como o [Homebrew para MacOS](https://brew.sh/), [Chocolatey para Windows](https://chocolatey.org/), e APT ou semelhante para distribuições linux. Esse comando acessará o arquivo .nvmrc e instalará a versão do Node utilizada no projeto.

Se não quiser instalar o NVM, terá de remover a chave "engine" do package.json para executar os scripts do projeto, mas não estará de acordo com os padrões do projeto.

- Para inicializar o container da aplicação em ambiente de desenvolvimento, execute o comando:

```bash
npm run docker:dev
```

ou use `yarn docker:dev`.

Para ter certeza que o projeto está rodando, acesse o endereço `http://localhost:${PORT}/docs` e veja a documentação swagger do projeto.

Para subir a aplicação sem cache algum do Docker, basta utilizar:

```bash
docker compose up --build --force-recreate
```

> Se quiser tentar conectar no MongoDB que você subiu no Docker sem utilizar a aplicação, tente utilizar o [Compass](https://www.mongodb.com/try/download/compass).

Se tiver escolhido rodar o banco de dados em container ou tiver instalado, e quiser rodar a aplicação localmente, precisará executar o comando:

```bash
npm run start:dev
```

ou use `yarn start:dev`.

#### Problemas comuns com o localhost

##### Banco de dados

É comum no MacOS ou no Windows WSL o "database" do HOST se associar ao IP dinâmico, ou seja, o IP que você está utilizando para acessar o computador ao invés de fazer o binding com o nome do serviço de banco de dados `database`. Existem alternativas para contornar esse problema:

- Se estiver utilizando WSL, verifique o IP `hostname -I | awk '{print $1}'` do seu WSL para poder colocar como HOST na variável ambiente DATABASE_URL no arquivo `.env`.
- Se estiver utilizando o MacOS, verifique o IP `ipconfig getifaddr en0` do seu Mac para poder colocar como HOST na variável ambiente DATABASE_URL no arquivo `.env`.
