const express = require('express');
const passport = require('passport');
const Poll = require('../models/Poll');

module.exports = app => {
    app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
        res.send({status: "Signup successful"});
    }); 
    app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
        res.send({status: "Login successful"});
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    app.get('/api/userData', (req, res) => {
        if (req.user) 
            res.send(req.user);
        else
            res.send(false);
    });
    app.get('/api/polls', (req, res) => {
        Poll.find({}, (err, polls) => {
            if (err) throw err;
            res.send(polls);
        });
    });
    app.route('/api/poll/:id')
        .get((req, res) => {
            Poll.findById(req.params.id, poll => {
                if (err) throw err;
                res.send(poll);
            });
        })
        .post((req, res) => {
            Poll.findByIdAndRemove(req.params.id, err => {
                if (err) throw err;
                res.send({status: 1});
            });
        });
    app.post('/api/poll', (req, res) => {            
        const newPoll = new Poll({
            title: req.body.title, 
            options: req.body.options.reduce((acc, option) => acc[option] = 0, {}),
            username: req.body.username
        });
        
        newPoll.save(err => {
            if (err) throw err;
            res.send(newPoll);
        });
    });
};