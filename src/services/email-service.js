'use strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) =>{
    sendgrid.send({
        to: to,
        from: 'Vai.Tomar@no.cu',
        subject: subject,
        html: body
    });
}