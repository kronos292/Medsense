const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/login', (req, res) => {
        const values = req.body;
        User.findOne({ username: values.username }, null, {collation: {locale: 'en', strength: 2 }}, function (err, user) {
            if (user !== null && user.validPassword(values.password)) {
                const previousLogin = user.currentLogin !== ""? user.currentLogin: new Date();
                User.findByIdAndUpdate(user._id, { $set: { previousLogin: previousLogin, currentLogin: new Date(), loginCount: user.loginCount+1 }}, { new: true }, function(err, user) {
                    req.session.user = user;
                    res.send('Authenticated');
                });
            } else {
                res.send('Invalid Username/Password!');
            }
        });
    });

    app.get('/api/updateSessionUser', (req, res) => {
        User.findOne({ username: req.session.user.username }, function (err, user) {
            if (user) {
                req.session.user = user;
                res.send('Authenticated');
            }
        });
    });

    app.post('/api/logout', function(req, res) {
        req.session = null;
        res.send('Done');
    });

    app.get('/api/current_user', (req, res) => {
        if(req.session.user !== undefined && req.session.user !== '' && req.session.user) {
            User.findByIdAndUpdate(req.session.user._id, { $set: { currentLogin: new Date() }}, { new: true }, function(err, user) {
                if(user !== null) {
                    console.log('Current User Id:', user._id, ', Current User Username:', user.username);
                }
                res.send(req.session.user);
            });
        } else {
            res.send(req.session.user);
        }
    });
};