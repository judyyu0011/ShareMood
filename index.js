const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handles post request sent from form submit
app.post('/form',(req, res)=>{

    var stickyList = [{colour: 'yellow', message: 'happy', posx: 399, posy: 300}, {colour: 'blue', message: 'sad', posx: 550, posy: 800}]
    res.send(stickyList);
});

app.listen(process.env.PORT || port, () => console.log(`http://localhost:${port}`));
