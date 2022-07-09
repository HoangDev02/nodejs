const cards = require('../models/card');
const paypal = require('paypal-rest-sdk');
const {mutipleMongooseToObject} = require('../../unitl/mongoose')

const card =  cards({})
var items = JSON.stringify(card);
const array = Object.values(card);

var total =0;
for(i = 0;i<items.length;i++)
{
    total+=parseFloat(items[i].price)*items[i].quantity;
}
const paypalControllers = {
    show : (req,res) => {
     res.render('paypal/paypal')
    },
    createPaypal: async (req,res ) => {

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": items,
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total":"25.00"
                },
                "description": "Hat for the best team ever"
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
              res.render('paypal/cancle');
                throw error
            } else {
                for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                  }
                }
                // console.log("create_payment_json")
                // console.log(payment)
            }
          });
          
    },
    create : (req,res) => {
        res.render('paypal/paypal')
    },
    Pay :(req, res) =>  {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "1000"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
         res.render('paypal/cancle');
      } else {
          console.log(JSON.stringify(payment));
          res.render('paypal/success');
      }
  });
  },
  Cancelled: (req,res) => {
    res.send('Cancelled')
  }
}
module.exports =  paypalControllers