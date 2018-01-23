const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = new Schema({
    title: { type: String, default: "title" },
    questions: [{ type: Schema.Types.ObjectId, ref: 'questionanswers' }],
    difficulty: { type: String, default: "difficulty" },
    speciality: { type: String, default: "speciality" },
    subspeciality: [{ type: String, default: "subspeciality" }],
    approach: [{ type: String, default: "approach" }],
    scenario: { type: String, default: "scenario" },
    learning: { type: String, default: "learning" },
    status: { type: String, default: "Pending" },
    timestamp: {type: String, default: Date.now()},
    userid: { type: Schema.Types.ObjectId, ref: 'users' },
    date: { type: String, default: "" }
});

const answerModel = mongoose.model('answers', answerSchema);

module.exports = answerModel;