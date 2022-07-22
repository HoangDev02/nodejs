const product= require('../models/product');
const Coures = require('../models/Course');

const {mutipleMongooseToObject} = require('../../unitl/mongoose')
const shopingController = {
    show: (req, res, next)=> {
   
      product.find({})
        .then(cards =>  {
          res.render('card/Stored-card', {
            product : mutipleMongooseToObject(cards)
          })
        })
        .catch(error => next(error))
     
        // res.render('HOME')
    },
    createCard: (req,res,next) =>  {
      res.render('card/Stored-card')
    },

    //[post]/card
    store: async (req,res, next) => {
      const courses = Coures.find({})
      const formData = req.body
      // // formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`   
      formData.name = 
      formData.price = "20000"
      formData.currency = "UDS"
      formData.amount = "1"
      // res.json(req.body)

      const products = new product(formData)
      products.save() 
      .then(() => res.redirect('/card'))
      .catch(error => {
        next(error) 
      });
    }
    
}

module.exports =shopingController;