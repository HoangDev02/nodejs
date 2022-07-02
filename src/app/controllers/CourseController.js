const Coures = require('../models/Course');

const {mongooseToObject} = require('../../unitl/mongoose.js')
class CourseController {
    //[GET] / new
    show(req,res, next) {
      Coures.findOne({ slug: req.params.slug})
      .then(coures => {
        res.render('courses/show', { coures: mongooseToObject(coures)})
      })
      .catch(next)
    }
  
    //get
    create(req,res, next) {
      res.render('courses/create')
    }
    //post
    store(req,res, next) {
      // res.json(req.body)
      const formData = req.body
      formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`
      const course = new Coures(formData)
      course.save() 
      .then(() => res.redirect('/me/stored/courses'))
      .catch(error => {
        
      });
    }
    // [get] /courses/:id/edit
    edit(req,res, next) {
      Coures.findById(req.params.id)
        .then(course =>  res.render('courses/edit', {
          course: mongooseToObject(course)
        }))
        .catch(next)
     
    }
  // [put] /courses/:id
    update(req,res,next){
      Coures.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
      }
       // [delete] /courses/:id
    destroy(req,res,next){
        Coures.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
        // [delete] /courses/:id/force
    forcedestroy(req,res,next){
        Coures.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
          // [PATH] /courses/:id/restore
    restore(req,res,next){
      Coures.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
    
    handleFormActions(req,res,next){
      switch(req.body.action){
        case 'delete':
          Coures.delete({_id: {$in: req.body.courseIds}})
          .then(() => res.redirect('back'))
          .catch(next)
          break;
        default:
          res.json({message: 'Action is  invaid!'})
      }
    }
}

module.exports = new CourseController();