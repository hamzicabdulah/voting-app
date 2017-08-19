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

    app.get('/api/polls/:username*?', (req, res) => {
        // If username parameter is provided, send polls from that user. Otherwise, send all polls.
        if (req.params.username) {
            Poll.find({ username: req.params.username }, (err, polls) => {
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
            // Delete if the poll is posted by the user who is logged in
            Poll.findById(req.params.id, (err, poll) => {
                if (err) throw err;
                if (poll.username === req.user.local.username) {
                    Poll.findByIdAndRemove(req.params.id, err => {
                        if (err) throw err;
                        res.send({status: 1});
                    });
                } else {
                    res.send({message: 'Unauthorized'});
                }
            });
        });

    app.post('/api/poll', (req, res) => { 
        // Add a new poll           
        const newPoll = new Poll({
            question: req.body.question, 
            username: req.user.local.username,
            options: []
        });
        req.body.options.forEach((option) => {
            newPoll.options.push({
                name: option,
                voters: []
            });
        });
        
        newPoll.save(err => {
            if (err) throw err;
            res.send(newPoll);
        });
    });

    app.post('/api/vote', (req, res) => {
        let { pollId, optionId } = req.body;

        Poll.findById(pollId, (err, poll) => {
            // Vote if user hasn't already voted
            if (req.user && poll.voters.indexOf(req.user.local.username) < 0) {
                Poll.findOneAndUpdate({ '_id': pollId, 'options._id': optionId }, 
                { '$push': { 'options.$.voters': req.user.local.username } }, { new: true }, (err, poll) => {
                    if (err) throw err;
                    Poll.findOneAndUpdate({ '_id': pollId }, 
                    { '$push': { voters: req.user.local.username } }, { new: true }, (err, poll) => {
                        if (err) throw err;
                        res.send(poll);
                    });
                });
            } else {
                res.send({ message: 'You are either not logged in or you have already voted.' });
            }
        });
    });

    app.post('/api/addOption', (req, res) => {
        // Add option only if user is logged in
        if (req.user) {
            let { pollId, option } = req.body;
            Poll.findByIdAndUpdate(pollId, { '$push': { options: { name: option, voters: [] } } }, { new: true }, (err, poll) => {
                if (err) throw err;
                res.send(poll);
            });
        } else {
            res.send({ message: 'User not authorized.' })
        }
    });
};