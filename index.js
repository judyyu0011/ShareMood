const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handles post request sent from form submit
app.post('/form',(req, res)=>{
    res.send(req.body);
});

app.listen(process.env.PORT || port, () => console.log(`http://localhost:${port}`));
