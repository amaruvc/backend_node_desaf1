const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url);
    const url = req.url;
    if (url == "/hoy") {
      res.write(`${new Date()}`);
    } else if (url == "/saludos") {
      res.write("Hola");
    } else if (url == "/test") {
      res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2>Web simple</h2>
    </body>
    </html> `);
    }
  })
  .listen(8080, () => console.log("listen port 8080"));
