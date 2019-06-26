# Desenvolvimento Baseado em Modelos - Cinema

## Manual de Utilizador
----------
### Índice
- [Desenvolvimento Baseado em Modelos - Cinema]()
- [Introdução]()
- [Generator]()
- [Website gerado]()



## Introdução

Este manual contém a documentação necessária de apoio ao utilizador, através da criação de modelos, geração do website e dados necessários.<br>
Para a elaboração do projeto foi utilizado:
- **Metamodelação** utilizando *JSON Schema*, uma síntaxe específica de *JSON*;
- **Transformações** modelo-para-texto utilizando a linguagem *Mustache*;
- **Base de dados**: SQLite3;
- **Principais linguagens de programação**: *JavaScript* e *NodeJS*.
<br>
Após a criação dos modelos, estes são transformados em classes *JavaScript* que representam o modelo em si e as respectivas entidades na base de dados. Estes dados são manejáveis através de uma API RESTful de forma a introduzir, visualizar, editar e apagar qualquer tipo de dado.
<br>

**Modelo**: Uma entidade do domínio do problema, com atributos específicos que necessitam de ser especificados. Por exemplo, é necessário definir um modelo que representará um produto na aplicação.
<br>

Neste caso especifico foi desenvolvido um *website* que disponobilidade informação sobre filmes, os seus respectivos trailers e covers.

Esta documentação visa descrever como usar a plataforma de geração automática de código, através de imagens e explicações, bem como a descrever a utilização da aplicação gerada.

## Gerador
No site principal (gerador) é possível visualizar o estado do *website* publicado no topo direito, sendo este actualizado constantemente...

![](generator_home.png)


### Consulta de Modelos
Ao aceder à opção *Models* é apresentada a página da figura abaixo. Nesta podem ser consultados todos os modelos a serem embutidos na aplicação gerada bem como as suas propriedades e referências externas para outros modelos.


![](generator_models.png)

### Inserção de Modelos

Ao aceder à opção *New Model* é possível ter acesso ao formulário de criação de um novo modelo para o site a ser gerado. É necessário inserir os campos do nome e descrição do modelo.
Para cada propriedade existe uma secção do formulário (*Property*) que permite adicionar propriedades ao modelo
Quando uma propriedade é adicionada a tabela das propriedades é actualizada e é possível remover esta propriedade através da opção *Remove*.

![](generator_newModel_props.png)


Na secção *Reference* é disponobilizada uma forma eficaz de adicionar um modelo de referencia ao que se vai criar, tendo varios tipos de relações disponiveis.
Por fim basta clicar em *Create Model* de forma a criar o modelo configurado.

![](generator_newModel_refs.png)


### Generator
Nesta página é possível gerar então o *website* após a escolha do tema pretendido para a aplicação gerada.
Após a geração deste é possível iniciar/parar o servidor, sendo o estado reflectido no topo direito do site principal a qualquer momento.

![](generator_generate.png)

Ao preencher o tema e clicar em *GENERATE WEBSITE* a geração irá iniciar e após alguns segundos o botão irá ser actualizado reflectindo que o processo já se encontra terminado.

![](generate_loading.png)



## Website Gerado

### HomePage
É possível iniciar o servidor gerado através do botão no topo direito do gerador após este se encontrar com o estado ligado.
Na página principal é possível aceder ao menu superior de forma a navegar entre o *FrontOffice* e as opções do *BackOffice*.

![](generated_homepage.png)

#### Listagem
![](generated_listagem.png)

#### Detalhes
![](generated_details.png)

#### Inserção
![](generated_new.png)

#### Edição
![](generated_edit.png)

#### Remoção
![](generated_remove.png)

#### FrontOffice

Nesta página é possível mudar os filtros que irão de imediato reflectir a informação apresentada por baixo.
![](generated_frontoffice.png)
