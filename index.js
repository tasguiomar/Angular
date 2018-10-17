const express = require('express')
const mongoose = require('mongoose')
const app = express();
const jwt = require('jsonwebtoken')
const User = require('./public/scripts/models/users');
const Todo = require('./public/scripts/models/todos')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();




if (dotenv.error) {
    console.log(".env file missing!")
    process.exit()
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(express.static(__dirname + "/public"));

// connect moongose
mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true
});

mongoose.connection.once('open', ()=>console.log('conectado'))
                    .on('error', (err)=> {console.log('nao conectado', err);
});

mongoose.set('useCreateIndex', true);


app.get('/', (req, res) => {
    res.json({
        message: 'teste App'
    });
});


app.delete('/delete/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, {
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Todo.findOne({
                    _id: req.params.id,
                    owner: authData.playload
                })
                .then(todo => {
                    todo.remove().then(todoRemoved => {
                        res.send('Todo removed ' + todoRemoved)
                    });

                })
        }
    })
})



app.put('/edit', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, { }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {


            Todo.findOne({
                    _id: req.body._id,
                    owner: authData.playload
                })
                .then(todo => {
                    todo.text = req.body.text ? req.body.text : todo.text;
                    todo.goalDate = req.body.goalDate ? req.body.goalDate : todo.goalDate;
                    todo.done = req.body.done ? req.body.done : todo.done;
                    todo.save().then(todoSaved => {
                        res.send(todoSaved);
                    }).catch(err => console.log(err))
                })
        }
    })
})


app.get('/user', verifyToken, (req, res) => {

    jwt.verify(req.token, process.env.SECRETKEY, {
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            User.findOne({
                _id: authData.playload
            }).then(user => {
                
                let userInfo ={
                    email : user.email,
                    name : user.name,
                    notifications : user.notifications,
                    sendingHour: user.sendingHour
                }
                res.send(userInfo);
            }).catch(err => {
                res.status(404).send(err)
            });
        }
    })
})

app.put('/user', verifyToken, (req, res) => {

    jwt.verify(req.token, process.env.SECRETKEY, { }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            User.findOne({
                _id: authData.playload
            }).then(user => {          

                user.name = req.body.name ? req.body.name : user.name;
                user.email = req.body.email ? req.body.email : user.email;
                user.password = req.body.password ? req.body.password : user.password;
                user.sendingHour = req.body.sendingHour ? req.body.sendingHour : user.sendingHour;


                if(req.body.notifications!=undefined)
                    user.notifications = req.body.notifications;
                
                if(user.sendingHour!=undefined)
                    user.sendingHour = req.body.sendingHour;

                user.save().then(userSaved => {
                    console.log(userSaved)
                    res.send({name: userSaved.name});
                }).catch(err=>{
                    
                    res.send(err)
                        
                    }
                )


            }).catch(err => {
                res.send(err)
            });
        }
    })
})


//verifica o registo 
app.post('/login', (req, res) => {
    console.log(req.body)

    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    newUser.save().then(savedUser => {

        res.send({sucess:'User saved!'})
    }).catch(err => {
        res.send({err})

    });
});

app.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        if (user) {
            var playload = user._id;
            jwt.sign({
                playload
            }, 'secretkey', (err, token) => {
                console.log(err)
                res.json({
                    message: "loged in",
                    token,
                    user
                });
            });
        } else {
            res.json({
                message: "error"
            })
        }

    })
})

app.post('/insert', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, {}, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            if (req.body.text && req.body.date) {


                var newTodo = new Todo({
                    owner: authData.playload,
                    text: req.body.text,
                    date: new Date(req.body.date),
                    goalDate: !req.body.goalDate ? null : new Date(req.body.goalDate),
                })

                newTodo.save().then(todo => {

                    Todo.find(todo).then(t => {

                        res.send({
                            message: 'TODO created...',
                            t
                        })

                    })
                }).catch(err => {
                    res.status(404).send(err)
                });


            } else {
                res.send("missing info")
            }
        }
    })
})

app.get('/toDo', verifyToken, (req, res) => {

    jwt.verify(req.token, process.env.SECRETKEY, {}, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            Todo.find({
                owner: authData.playload
            }).then(todos => {
                res.send(todos);
            }).catch(err => {
                res.status(404).send(err)
            });
        }
    })
})


app.listen(8000, function(){
    console.log("teste da porta 8000");
});


//codigo net verifica token tenho que testar e perceber

//FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer id undefine

    if (typeof bearerHeader !== 'undefined') {
        console.log(req.headers)
        //split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1];
        //set the token

        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}