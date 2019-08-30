'use strict';
 
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};


exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email , 'Email Invalido');
    contract.hasMinLen(req.body.password, 6, 'A descrição deve conter pelo menos 6 caracteres');
    
    //Se os dados forem inválidos
    if(!contract.isValid(0)){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name:req.body.name,
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({
            message: "cliente cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};