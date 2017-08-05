const express = require('express');
const passport = require('passport');
const Poll = require('../models/Poll');

module.exports = app => {
    app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
        res.send({userData: req.user});
    }); 
    app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
        res.send({userData: req.user});
    });
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send({userData: false});
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
            question: req.body.question, 
            options: req.body.options.reduce((acc, option) => acc[option] = 0, {}),
            userId: req.user._id
        });
        
        newPoll.save(err => {
            if (err) throw err;
            res.send(newPoll);
        });
    });
};