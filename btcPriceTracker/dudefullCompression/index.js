const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors');
const app = express();
// здесь мы указываем адрес нашего сервера
const API_SERVICE_URL = "http://dev.dev01.ish2.crpt.tech";;
// прописываем следующую строку, если используется незашифрованное соединение
// это серьезная брешь в безопасности, следует использовать только на этапе
// разработки, и никогда в продакшене process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// здесь мы указываем, какие заголовки нам нужно разрешить для использования app.use(cors({ exposedHeaders: '*' }));
app.use("/", createProxyMiddleware({ target: API_SERVICE_URL, changeOrigin: true, ws: true, logLevel: "debug" }));
app.listen(PORT, HOST, () => { console.log(`Starting Proxy Server at ${HOST}:${PORT}`); });