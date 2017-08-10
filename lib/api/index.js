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
    app.get('/api/polls/:id*?', (req, res) => {
        if (req.params.id) {
            Poll.find({ userId: req.params.id }, (err, polls) => {
                if (err) throw err;
                res.send(polls);
            });
        } else {
            Poll.find({}, (err, polls) => {
                if (err) throw err;
                res.send(polls);
            });
        }
    });
    app.route('/api/poll/:id')
        .get((req, res) => {
            Poll.findById(req.params.id, (err, poll) => {
                if (err) throw err;
                res.send(poll);
            });
        })
        .delete((req, res) => {
            Poll.findByIdAndRemove(req.params.id, err => {
                if (err) throw err;
                res.send({status: 1});
            });
        });
    app.post('/api/poll', (req, res) => {            
        const newPoll = new Poll({
            question: req.body.question, 
            options: [],
            votes: [],
            userId: req.user._id
        });
        req.body.options.forEach((option) => {
            newPoll.options.push(option);
            newPoll.votes.push([]);
        });
        
        newPoll.save(err => {
            if (err) throw err;
            res.send(newPoll);
        });
    });
    app.post('/api/vote', (req, res) => {
        let { id, optionIndex } = req.body;
        console.log(optionIndex);
        Poll.findByIdAndUpdate(id, {$push: {'votes[optionIndex]': req.user._id}}, {new: true})
            .exec(function (err, poll) {
                if (err) throw err;
                res.send(poll);
            });
    });
};