const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var data = {mood: "happy", description: "this is happy description", color: "red"}

    res.render('home', {data:data});
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.listen(process.env.PORT || 3000, () => console.log(`http://localhost:3000`));
