/**
 * Created by Administrador on 08/05/2015.
 */
module.exports=function(app) {
    var User = require('../models/users/SchemaUsers.js');

//GET users

    findAllUsers = function (req, res) {
        User.find(function (err, users) {
            if (!err) {
                res.send(users);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };


//GET user by id
    findUser = function (req, res) {
        User.findOne({"_id": req.params._id}, function (err, user) {
            if (!err) {
                res.send(user);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }

//DELETE User

    deleteUser = function (req, res) {
        console.log('DELETE user');
        console.log(req.params._id);

        User.findOne({"_id": req.params._id}, function (err, user) {
            user.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR' + err);
                }
            })
        });

        res.send('User removed');
    }

//UPDATE User

    updateUser = function (req, res) {
        console.log('UPDATE user');
        User.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, user) {
            //console.log(user._id);
            user.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.send('User Modified');
    }

    //POST User
    addUser = function (req, res) {
        console.log('POST user');
        console.log(req.body);

        User.findOne({username: req.body.username},function(err, user){

            if (!user){

                var user = new User({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    age: req.body.age,
                    nation: req.body.nation,
                    description: req.body.description

                });
                user.save(function (err) {

                    if (!err) {
                        console.log('User added');
                    }
                    else {

                        console.log('ERROR', +err);
                    }
                })

                res.send(user);

            }
            else{
                res.send('Usuario existe!')
            }

        })
    }

//Get de user por username
    findByUsername = function (req, res) {
        User.findOne({"username": req.params.username}, function (err, user) {
            if (!err) {
                res.send(user);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }


//endpoints
    app.get('/users', findAllUsers);
    app.get('/user/:_id', findUser);
    app.post('/users', addUser);
    app.put('/user/:_id', updateUser);
    app.delete('/user/:_id', deleteUser);
    app.get('/user/username/:username', findByUsername)

}