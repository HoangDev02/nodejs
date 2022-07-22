const User = require('../models/User')
const teacher =  {

    test: async(req,res,next) => {
       const users = User.find({isadmin: req.params.isadmin})
       if(users === true) {
            res.json("thành công")
       }else {
        res.json("thất bại")
       }
    }
    
}
module.exports = teacher