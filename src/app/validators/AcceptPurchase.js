const Joi = require('joi')

module.exports = {
  body: {
    purchasedBy: Joi.string().required()
  }
}
