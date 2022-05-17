const express =  require('express');
const cors = require('cors');
const config = require("config");
const mysql = require("mysql2");
const auth = require("./middleware/auth");
const register = require("./controllers/register");
const login = require("./controllers/login");
const home = require("./controllers/home");
const user = require("./controllers/user");
const country = require("./controllers/country");
const shop = require("./controllers/shop");
const category = require("./controllers/category");
const item = require("./controllers/item");
const cart = require("./controllers/cart");
const order = require("./controllers/order");
const favoriteitem = require("./controllers/favoriteitem");
const currency = require("./controllers/currency");
const mongoDB = require('./config');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(cors());
app.use(express.json());
console.log(config)

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoDB.mongoURI, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


app.listen(3001, ()=>{
    console.log('Example app listening on port 3001');
})

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
  }));

app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/home',home);
app.use('/api/user',user);
app.use('/api/country',country);
app.use('/api/shop',shop);
app.use('/api/category',category);
app.use('/api/item',item);
app.use('/api/cart',cart);
app.use('/api/order',order);
app.use('/api/favoriteitem',favoriteitem);
app.use('/api/currency',currency);