const express = require('express');
const mongoose = require('mongoose');
const Message = module.require('./models/messages')

const app = express();

app.set('view engine','ejs');

const dBURI = 'mongodb+srv://abhinav:abhinav2005@messenger.wjyjr.mongodb.net/Message-Data?retryWrites=true&w=majority&appName=messenger';
mongoose.connect(dBURI)
.then((result) =>app.listen(3000))
.catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded());

app.post('/', (req,res) => {
    const message = new Message(req.body);
    message.save()
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err));
})
app.get('/',(req,res) => {
    // const message = new Message({
    //     sender : 'Abhinav',
    //     message: 'Mai chutiya hoon'
    // });

    // message.save()
    //     .catch((err) => console.log(err));
    
  //  res.render('index');

    Message.find().sort({createdAt: -1})
    .then((result) => res.render('index', {messages: result}));
})



