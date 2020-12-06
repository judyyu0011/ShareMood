const express = require('express');
const app = express();
const { readFile } = require('fs');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('Hello Express')
});

app.listen(process.env.PORT || 3000, () => console.log(`http://localhost:3000`));
