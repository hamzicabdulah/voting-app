var express = require('express');
var passport = require('passport');

module.exports = function(app) {
    app.post('/api/signup', passport.authenticate('local-signup'), function(req, res) {
        res.send({status: "Signup successful"});
    }); 
    app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
        res.send({status: "Login successful"});
    });
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/api/userData', function(req, res) {
        if (req.user) 
            res.send(req.user);
        else
            res.send(false);
    });
};