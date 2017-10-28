var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '/routes'))
router.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose')
var User = require('../../models/User');
var Case = require('../../models/Case');
var Question = require('../../models/Question');
var MCQ = require('../../models/MCQ');

router.post('/', function (req, res) {
    var questionArray = req.body.questionArray;
    var jsonObject = JSON.parse(questionArray);
    var newCase = new Case({
        title: req.body.title,
        difficulty: req.body.difficulty,
        speciality: req.body.speciality,
        subspeciality: req.body.subspeciality,
        approach: req.body.approach,
        scenario: req.body.scenario,
        author: mongoose.Types.ObjectId(req.body.author),
    });
    for (var prop in jsonObject) {
        var newQuestion = new Question({
            title: jsonObject[prop]['title'],
            type: jsonObject[prop]['type'],
            open: jsonObject[prop]['open'],
            pearl: jsonObject[prop]['pearl'],
            timelimit: jsonObject[prop]['timelimit'],
            reference: jsonObject[prop]['reference'],
            stem: jsonObject[prop]['stem']
        })
        for (var key in jsonObject[prop]['mcqs']) {
            var newMCQ = new MCQ({
                answer: "",
                status: true
            })
            for (var key1 in jsonObject[prop]['mcqs'][key]) {
                newMCQ.answer = jsonObject[prop]['mcqs'][key]["answer"];
                newMCQ.status = jsonObject[prop]['mcqs'][key]["status"];
            }
            newMCQ.save();
            newQuestion.mcqs.push(newMCQ._id);
            newQuestion.save();
        }
        newCase.questions.push(newQuestion._id);
        newCase.save();
    }
    return res.status(201).send({ data: null, message: "case created" });
});

router.post('/update', function (req, res) {
    Case.findById(req.body.id, function (err, oneCase) {
        oneCase.title = "req.body.title"
        oneCase.difficulty = "req.body.difficulty"
        oneCase.speciality = "req.body.speciality"
        oneCase.subspeciality = "req.body.subspeciality"
        oneCase.approach = "req.body.aproach"
        oneCase.scenario = "req.body.scenario"

        var questionArray = req.body.questionArray;
        var jsonObject = JSON.parse(questionArray);
        for (var prop in jsonObject) {
            Question.findById(jsonObject[prop]['id'], function (err, oneQuestion) {
                oneQuestion.title = jsonObject[prop]['title']
                oneQuestion.type = jsonObject[prop]['type']
                oneQuestion.open = jsonObject[prop]['open']
                oneQuestion.pearl = jsonObject[prop]['pearl']
                oneQuestion.timelimit = jsonObject[prop]['timelimit']
                oneQuestion.reference = jsonObject[prop]['reference']
                oneQuestion.stem = jsonObject[prop]['stem']

                for (var key in jsonObject[prop]['mcqs']) {
                    MCQ.findById(jsonObject[prop]['mcqs'][key]["id"], function (err, oneMCQ) {
                        if (oneMCQ) {
                            oneMCQ.answer = jsonObject[prop]['mcqs'][key]["answer"]
                            oneMCQ.status = jsonObject[prop]['mcqs'][key]["status"];
                            oneMCQ.save();
                        }
                    })
                }
            })
        }
        oneCase.save()
        return res.status(201).send({ data: null, message: "case updated" });
    });
});

module.exports = router;
