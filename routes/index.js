var express = require('express');
var router = express.Router();


var Class = require('../Schema/classSchema');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/class', async function(req,res){
  try {
    const allClasses = await Class.find();
    return res.json({
      status: true,
      data: allClasses,
      err: {},
      msg: "Classes fetched successfully.",
    });
  } catch (err) {
    return res.json({
      status: false,
      data: {},
      err,
      msg: "Unable to fetch classes.",
    });
  }
});

router.post('/class', async function(req, res){
  const {
      subjectName, 
      teacherName, 
      classCode, 
      classGroup, 
      noOfPeriod, 
      courseCode, 
      link1, 
      startTime, 
      endTime, 
      weekDay
  }= req.body;
    
    
});

module.exports = router;
