var express = require('express');
var router = express.Router();


var Class = require('../Schema/classSchema');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/class', async function (req, res) {
  try {
    const allClasses = await Class.find({});
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

router.post('/api/class', async function (req, res) {
  const {
    subjectName,
    teacherName,
    classCode,
    classGroup,
    startingPeriod,
    noOfPeriod,
    courseCode,
    link1,
    // startTime,
    // endTime,
    weekDay
  } = req.body;

  try {
    var newClass = new Class({
      subjectName: subjectName,
      teacherName: teacherName,
      classCode: classCode,
      classGroup: classGroup,
      startingPeriod: startingPeriod,
      noOfPeriod: noOfPeriod,
      courseCode: courseCode,
      link1: link1,
      // startTime: startTime,
      // endTime: endTime,
      weekDay: weekDay
    })
    console.log(newClass)
    newClass.save();
    return res.json({
      status: true,
      data: newClass,
      err: {},
      msg: "Classes saved successfully.",
    });
  } catch {
    return res.json({
      status: false,
      data: {},
      err,
      msg: "Unable to save classes.",
    });
  }




});

module.exports = router;
