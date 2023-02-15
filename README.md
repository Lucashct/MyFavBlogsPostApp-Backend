# API da Aplicação My favorites Blogsposts App

Este projeto foi desenvolvido principalmente com Node.js e express, com a finalidade de salvar posts de blogs predefinidos.

## Puppeteer

Para buscar os posts nos blogs, foi utilizada a biblioteca Puppeteer, ela é capaz de abrir um navegador em modo headless, sem uma vizualização gráfica e com o comando `page.evaluate()`, ela permite usar querys para selecionar tags html.

## Sqlite3

Para persistência dos dados capturados optei por um banco de dados local pela pequena quantidade de dados, o Puppeteer busca os conteúdos nos blogs de terceiros e salva em uma tabela do sqlite para recuperação pelo front-end.

# Rotas

### `/` POST

Acessada ao entrar na aplicação, ativa a funcionalidade do Puppeteer que busca os links e salva os dados necessários do post.

### `/links` GET

Lista todos os dados salvos no banco de dados local retornando um objeto JSON.

### `/links/update` POST

Rota responsável pela atualização do Label, Link e link da imagem que são capturadas na postagem do Blog.

### `/links/delete` POST

Rota utilizada para deletar o link com todos os seus dados. Para uma atualização melhor dos posts listados o link não é excluído no banco, é apenas uma exclusão lógica, o motivo principal disso é para a não duplicação dos posts guardados pela API, uma véz que a tabela não permite guardar links iguais.

Aplicação sem fins lucrativos.