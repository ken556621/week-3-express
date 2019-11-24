const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(cookieParser());

let userList = [];

app.get('/', (req, res, next) => {
    res.render('index');
})

//router for sum the number
app.get('/getData', (req, res, next) => {
    if(isNaN(req.query.number)){
        return res.send('Wrong Parameter');
    }else{
        let number = Number(req.query.number);
        let result = (1 + number) * number / 2;
        res.json(`${result}`);
    }
})


//router for cookie
app.get('/myName', (req, res, next) => { 
    //cookie check
    if(userList.find(user => user === req.cookies.user)){
        res.send(`Hello ${req.cookies.user}, you have been logined!`);
    }else{
        res.redirect('/trackName.html');
    }  
})

//route for set the cookie in backend
app.get('/trackName', (req, res, next) => { 
    const userName = req.query.name;
   
    res.cookie('user', `${userName}`, { expires: new Date(Date.now() + 900000), httpOnly: true });
    userList.push(userName);
    res.redirect('/myName');
})

//Logout
app.get('/logout', (req, res, next) => {
    res.clearCookie('user');
    userList = [];
    res.send('You have been logout!');
})


app.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}`);
})