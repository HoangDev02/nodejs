const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose)


const Schema = mongoose.Schema;
const Course = new Schema({
    name: {type: String,  required: true },
    description: {type:String, maxlength: 600 }, 
    image: {type:String, maxlength: 255},
    videoID: {type:String, maxlength: 255},
    lever: {type:String, maxlength: 255},
    slug: { type: String, slug: 'name' , unique: true},
    course: {type: String, maxlength: 255},
    benefitOne: {type: String, maxlength: 255},
    benefitTow: {type: String, maxlength: 255},
    benefitThree: {type: String, maxlength: 255},
    price: {type:String, required:true},
  },
  {
    _id: false,
    timestamps:true
  });

  //add plugin

  mongoose.plugin(slug);
  Course.plugin(AutoIncrement)
 

  Course.plugin(mongooseDelete,{ 
    deleteAt: true,
    overrideMethods: 'all' }) 
  module.exports = mongoose.model('Course', Course);
  