const card = require('../models/card');
const Coures = require('../models/Course');

const {mutipleMongooseToObject} = require('../../unitl/mongoose')
const shopingController = {
    show: (req, res, next)=> {
   
      card.find({})
        .then(cards =>  {
          res.render('card/Stored-card', {
            cards : mutipleMongooseToObject(cards)
          })
        })
        .catch(error => next(error))
     
        // res.render('HOME')
    },
    createCard: (req,res,next) =>  {
      res.render('card/Stored-card')
      // console.log( res.render('card/Stored-card'))
    },
    //[post]/card
    store: async (req,res, next) => {
      const courses = Coures.find({})
      const formData = req.body
      // // formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`   
      formData.name =  `<h1 class="title-name" id="title-name">${req.body.name}</h1>`
      formData.price = "20000"
      formData.currency = "UDS"
      formData.amount = "1"
      // res.json(req.body)

      const cards = new card(formData)
      cards.save() 
      .then(() => res.redirect('/card'))
      .catch(error => {
        next(error)
      });
    }
    
}

module.exports =shopingController;