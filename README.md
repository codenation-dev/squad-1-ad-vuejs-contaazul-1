(src/assets/login-logo.pnc)

# Error.Log

## Documentação do projeto

O Error.Log é uma plataforma web que possui como objetivo centralizar registros de erros de aplicações, visto que durante o desenvolvimento de projetos que possuem diferentes camadas (backend, frontend, mobile, desktop), os erros podem surgir em lugares distintos. Desta forma, é muito importante que os desenvolvedores possam centralizar todos os registros de erros em um local. 

O uso do Error.Log proporciona um entendimento acerca dos erros que estão sendo gerados, assim garantindo um controle para o usuário do que está acontecendo em seu projeto, quais são os erros, quantos deles são, quais são mais critícos e diversas outras informações que oferecem um controle para o usuário. Além disso, o Error.Log foi projetado e construído por desenvolvedores que também já vivenciaram este cenário, logo, entendemos na prática a importância que é poder ter este controle.

Este projeto foi desenvolvido junto ao AceleraDev sobre Vue.js em Joinville - SC, em parceria com a Conta Azul. Assim, o objetivo dos autores deste era aplicar os conceitos aprendidos durante o andamento do curso.

[Clique aqui para ser redirecionado para o Error.Log](https://error-log-system.web.app/)

### Autores

  * **[Ediana Souza](https://github.com/edianassouza)**
  * **[Elen Souza](https://github.com/ElenSouza29)**
  * **[Lucas Peruchi Pereira](https://github.com/PeruchiBR)**

### Instalação e Compilação do Projeto

    * npm intall
    * npm run lint
    * npm run test:unit
    * npm run serve
    * npm run build

### Funcionalidades

- Registro de usuário
- Alteração de senha do usuário
- Autenticação de usuário
    - Logout de usuário
- Página de logs
    - Ordenação de logs
    - Filtragem de logs
    - Arquivar/Apagar/Resetar logs
    - Indicadores visuais dos logs
- Página de 404 personalizada
- Responsividade 

### Ferramentas e tecnologias utilizadas

- JavaScript
- Node.js
- Vue.js
- Bulma
- MockAPI
- CircleCI
- Firebase
- Github

### Organização da Squad

Para organização do projeto nós utilizamos o Kanban ([clique aqui para mais informações](https://github.com/codenation-dev/squad-1-ad-vuejs-contaazul-1/projects/1)), na qual inicialmente realizamos um levantamento das funcionalidades que deveriam ser desenvolvidas, e adicionamos ao nosso diagrama de Kanban. Posteriormente foram criadas issues referente a essas funcionalidades, que foram divididas entre os integrantes da squad. Além de constantes reuniões de alinhamento, fizemos muito uso da técnica de programação em grupo.

### Organização do Error.Log

#### Front-end

Como utilizamos Vue.js, o Error.Log possui a seguinte arquitetura:
    - Em views estão dispostas todas as telas do produto, sendo elas: Login, Registro, Alteração de Senha, Erro 404 personalizado e Logs. 
    - Em services estão dispostas as requisições feitas ao MockAPI, tanto requisições relacionadas ao logs, como também requisições relacionadas ao usuário.
    - Em router estão dispostas as rotas do sistema. Vale lembrar que o Error.Log é uma SPA (Single Page Application), evitando que as views precisem ser totalmente recarregadas após mudança de rotas.
    - Em store se encontra o gerenciamento do estado da aplicação, isto é, regras que garantem que o estado só possa ser mutado de forma previsível, além de conter informações do estado propriamente. Através disso podemos compartilhar o estado com todos as views, gerando reatividade e reaproveitamento de códigos. 
    - Em tests estão disponíveis os testes unitários realizados. Eles tinham como objetivo testar principalmente os inputs e chamadas de métodos nas views. 

#### Back-end com dados mockados

O back-end do Error.Log foi desenvolvido utilizando o mockAPI. O mockAPI é um servidor fake que simula uma API como se fosse um back-end. Nele existem endpoints onde podemos inserir e fazer buscas de dados como se fosse o back-end. Todo problema que pudessemos ter por não ter um back-end, foi resolvido utilizando o JS.
