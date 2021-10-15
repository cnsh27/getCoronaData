const express =require('express')
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(cors());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('server is opened at 3000!');
});