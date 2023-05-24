# CBC API
App para teste técnico da CBC

## Rotas disponíveis

`GET` - listar todos os clubes
```
  http://localhost:3001/clubes
```

`POST` - criar um clube
```
  http://localhost:3001/clubes
```

`POST` - consumir recursos
```
 http://localhost:3001/consumir
```

<hr>
<br>

## Como executar?

Primeiro mude o nome do arquivo `.env-example` para `.env`

Após isso será necesário inicar os containers do docker
```bash
docker-compose up -d
```

Entre no container `cbc_api` para ter acesso ao terminal:

```bash
docker exec -it cbc_api bash
```

Agora, já dentro do terminal, instale as dependencias
```bash
npm install
```

Rode a aplicação, isso irá criar um banco de dados já populado:
```bash
npm run dev
```

### Dica

Caso tenha conflitos com portas já usadas. Use os comandos:

```bash
killall node # Parar qualquer aplicação node que esteja sendo executados na máquina!
docker stop $(docker ps -qa) # Para containers que estão sendo executados!
