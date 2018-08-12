

const http = require("http");
const querystring = require("querystring");
// 1) Делать запросы на другие серверы (http.request);
// 2) Обработка входящих запросов(http.createServer, .listen);

const server = http.createServer({},
    (request /* Запрос */, response /* Ответ */) => {
        // /users/ --- POST, body = { a: 1 }
        // response.statusCode = 201;
        const name = querystring.parse(request.url.slice(2)).name;

        request.query = querystring.parse(request.url.slice(2));

        if(request.url === '/users/' && request.method === "GET"){}
        response.end(`Hello, ${name}`);
        // debugger;
    });
server.listen(8080);

