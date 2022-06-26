## Запуск

```
npm i
npm start
```

## API

Открыт единственный маршрут на корень `/`.

Можно сформировать `GET` запрос с query параметрами.

Валидны только несколько query параметров из этой документации https://docs.github.com/en/rest/issues/issues#list-repository-issues.

`sort`, `milestone`, `state` и `labels`

В ответ получим либо сообщение об отсутствии issues, либо массив с ними.

Каждый запрос бдует запрашивать issues с разнах организаций и репозиториев.

## Пример запроса через `curl`

```
curl localhost:3000?sort="comments"
```
