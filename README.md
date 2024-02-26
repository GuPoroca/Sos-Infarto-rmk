# Sos-Infarto

### Docker

- Rodar o ambiente pelo docker, talvez nao funcione para android, testar posteriormente ...

## Como rodar

- Voce primeiramente precisa baixar o docker na sua máquina : https://www.docker.com/products/docker-desktop/

- Após isso voce precisará utilizar o seguinte comando para buildar o ambiente da nossa aplicação:

```
docker build -t nossa-equipe/sos-infarto --load .
```

- Caso você se depare com o seguinte erro:

```
The legacy builder is deprecated and will be removed in a future release. Install the buildx component to build images with BuildKit:
```

- Você precisará baixar o buildx para o seu sistema operacional (incluso no Docker para Windows e Mac)

- Após buildar o ambiente voce precisará rodar esse ambiente, use o seguinte comando para isso

```
docker run -p 8100:8100 -it nossa-equipe/sos-infarto:latest
```

- Com isso(se tudo deu certo) irá aparecer uma linha de comando com os arquivos do projeto e o ambiente certamente configurado no endereco /usr/src/app#, agora você irá precisar utilizar o seguinte comando para iniciar o projeto:

```
ionic serve
```

Após isso é só rodar o projeto externo(o embaixo do localhost) com a porta 8100


Para aplicar mudanças feitas no app, utilize o comando

```
ionic build
```

Antes do ionic serve
