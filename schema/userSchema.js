const Joi = require('joi')

const userSchema = {
    register: Joi.object({
        Name: Joi.string().max(50).required(),
        JobTitle: Joi.string().max(30),
        Age: Joi.number().min(20).max(45).integer(),
        Location: Joi.string().max(30),
        Description: Joi.string(),
        Email: Joi.string().email({ tlds: { allow: false } }).required(),
        Password: Joi.string().required()
    })
}

module.exports = userSchema