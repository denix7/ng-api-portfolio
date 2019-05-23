'use strict'

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Home its works'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Method test its works'
        })
    }
}

module.exports = controller;