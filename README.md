# Soccer Teams Manager
Backend App to manage soccer teams.

## Routes

`GET` - Show all teams
```
  http://localhost:3001/clubes
```

`POST` - create a team
```
  http://localhost:3001/clubes
```

`POST` - consume resources
```
 http://localhost:3001/consumir
```

<hr>
<br>

## How to use?

Change file name `.env-example` to `.env`

Start docker containers
```bash
docker-compose up -d
```

Use docker terminal `cbc_api`:

```bash
docker exec -it cbc_api bash
```

Install dependencies
```bash
npm install
```

Start the app, this will create a populated database
```bash
npm run dev
```

### tip

In case of port conflict, run:

```bash
killall node # Parar qualquer aplicação node que esteja sendo executados na máquina!
docker stop $(docker ps -qa) # Para containers que estão sendo executados!
