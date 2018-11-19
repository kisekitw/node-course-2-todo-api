require('./config/config');
// Library import
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');

// Local import
const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/todo');
const {
    User
} = require('./models/user');
const {
    authenticate
} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {

    // TODO: New a todo model instance
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    // TODO: Save model instance
    todo.save().then((result) => {
        res.send(result);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((result) => {
        // send可直接回傳result, 也可用物件包裹, 這樣還可傳額外資訊
        res.send({
            result,
            code: 'something'
        })
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findByOne({
        _id: id,
        _creator: req.user.id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });

});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findByOneAndRemove({
        _id: id,
        _creator: req.user.id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user.id
    }, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });

});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    //res.send(body);
    user.save().then(() => {

        return user.generateAuthToken();
    }).then((token) => {
        // 將auth資訊加到header中
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });

});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateAuthToken()
                .then((token) => {
                    res.header('x-auth', token).send(user);
                });
        }).catch((e) => {
            res.status(400).send(e);
        })
})

app.get('/users/me', authenticate, (req, res) => {
    // Move to authenticate
    // var token = req.header('x-auth');
    // // res.send(token);
    // User.findByToken(token).then((user) => {
    //     if (!user) {
    //         // res.status(401).send();
    //         // 會發出exception至下方catch
    //         return Promise.reject();
    //     }
    //     res.send(user);
    // }).catch((e) => {
    //     res.status(401).send(e);
    // });

    res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

// 一定要在末端, 不然會無法識別要註冊的static method
app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};