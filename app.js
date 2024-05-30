const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    res.render('index');
})

app.get('/createUser', (req,res) => {
    res.render('create');
})

app.get('/viewUser', async (req,res) => {
    let allUsers = await userModel.find()
    res.render('view',{users: allUsers});
})

app.post('/create', async (req,res) => {
    let {name ,email ,image } = req.body;
  let newUser= await userModel.create({
        name,
        email,
        image
    })
    res.redirect('/viewUser');
})

app.get('/delete/:id', async (req,res) => {
    let user = await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/viewUser');
    
})

app.get('/edit/:id', async (req,res) => {
    let user = await userModel.findOne({_id:req.params.id})
    res.render('edit',{user});
})

app.post('/update/:id', async (req,res) => {
    let {name ,email ,image } = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image});
    res.redirect('/viewUser');
})


app.listen(3000);