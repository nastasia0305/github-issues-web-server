const express = require('express');
const mainRoute = require('./route/main.route');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', mainRoute);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
