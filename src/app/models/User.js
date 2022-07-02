 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // maxlength:20,
        // minlength:6,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
      type: String,
      default: false,
    },
    sex: {
      type: String,
      unique: true,
    },
    date: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    }
    }, {timestamps: true, _id:true}
    
);
    UserSchema.statics = {
    findByEmail(email) {
      return this.findOne({email: email});
    }
  }
  
  UserSchema.methods = {
    comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  
  mongoose.plugin(slug);
module.exports = mongoose.model('User', UserSchema);