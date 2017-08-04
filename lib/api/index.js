var express = require('express');
var passport = require('passport');

module.exports = function(app) {
    app.post('/api/signup', passport.authenticate('local-signup'), function(req, res) {
        res.send({status: "Signup successful"});
    }); 
    app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
        res.send({status: "Login successful"});
    });
};