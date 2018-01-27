const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionAnswerSchema = new Schema({
    id: { type: String, default: "" },
    stem: { type: String, default: "" },
    question: { type: String, default: "" },
    attachment: { type: String, default: "" },
    filename: { type: String, default: "" },
    filetype: { type: String, default: "" },
    type: { type: String, default: "" },
    openEnded: { type: String, default: "" },
    pearl: { type: String, default: "" },
    time: { type: String, default: "" },
    reference: { type: String, default: "" },
    case: { type: Schema.Types.ObjectId, ref: 'cases' },
    mcq1: { type: String, default: "" },
    mcq2: { type: String, default: "" },
    mcq3: { type: String, default: "" },
    mcq4: { type: String, default: "" },
    mcq5: { type: String, default: "" },
    mcq6: { type: String, default: "" },
    check1: { type: Boolean, default: false },
    check2: { type: Boolean, default: false },
    check3: { type: Boolean, default: false },
    check4: { type: Boolean, default: false },
    check5: { type: Boolean, default: false },
    check6: { type: Boolean, default: false }
});

const questionAnswerModel = mongoose.model('questionanswers', questionAnswerSchema);

module.exports = questionAnswerModel;

