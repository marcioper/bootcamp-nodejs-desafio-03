const models = require('../models')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await models.Ad.findById(ad).populate('author')

    if (purchaseAd.purchasedBy) {
      return res.status(405).json({ error: 'This ad has already been sold' })
    }

    const user = await models.User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    const purchase = await models.Purchase.create({
      ...req.body,
      user
    })

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
