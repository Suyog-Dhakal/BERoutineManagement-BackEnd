var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new mongoose.Schema({
    subjectName: { type: String, required: false },
    teacherName: { type: String, required: false },
    classCode: { type: String, required: false },
    classGroup: { type: String, required: false },
    noOfPeriod: { type: Number, required: false },
    courseCode: { type: String, required: false },
    link1: { type: String, required: false },
    startTime: { type: String, required: false },
    endTime: { type: String, required: false },
    weekDay: {
        type: String, enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday',
            'friday', 'everyday'], required: false
    },
}, { timestamps: false });

module.exports = mongoose.model('Class', classSchema);