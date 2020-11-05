import mongoose from 'mongoose';

var classSchema = new mongoose.Schema({
    subjectName: { type: String, required: true},
    teacherName: { type: String, required: true},
    classCode: { type: String, required: true},
    classGroup: { type: String, required: true},
    noOfPeriod: { type: Number, required: true},
    courseCode: { type: String, required: false},
    link1: { type: String, required: false },
    startTime: { type: String, required: true},
    endTime: { type: String, required: true},
    weekDay: { type: String, enum: ['sunday','monday','tuesday','wednesday','thursday',
                                   'friday', 'everyday'], required: true},
}, { timestamps: true });

var Class = mongoose.model('Class', classSchema);

export default Class;