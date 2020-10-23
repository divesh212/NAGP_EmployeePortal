var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const Openings = require('../models/openings');

router.get('/', isAuthenticated(), (req, res, next) => {
    Openings.find({ isOpen: true }, (err, openings) => {
        if (err) console.log("Error while fetcing openings");
        res.render('index', {
            title: 'Employee Portal',
            openings: openings,
            isManager: req.user.isManager
        })
    })
})

router.get('/add', isAuthenticated(), (req, res, next) => {
    res.render('add-opening', {
        title: 'Employee Portal',
        opening: {}
    })
})

router.get('/add/:id', isAuthenticated(), (req, res, next) => {
    Openings.findById(req.params.id, (err, opening) => {
        if (opening) {
            res.render('add-opening', {
                title: 'Employee Portal',
                opening: opening
            })
        }
    })

})

router.get('/:id', isAuthenticated(), (req, res, next) => {
    Openings.findById(req.params.id, (err, opening) => {
        if (err) next(createHttpError(404, "Error fetching opening by id: " + req.params.id));
        res.render('opening-details', {
            title: 'Employee Portal',
            opening: opening,
            isManager: req.user.isManager
        })
    })
})

router.post('/add', isAuthenticated(), (req, res, next) => {
    if (req.user.isManager) {

        req.body.createdBy = req.user.username;
        if (req.body.isOpen === 'Open') {
            req.body.isOpen = true;
        } else {
            req.body.isOpen = false;
        }

        const opening = new Openings(req.body);
        // Add an opening
        if (!req.body._id) {
            req.body.createdBy = req.user.username;
            opening.save((err, savedOpening) => {
                if (err) next(createHttpError(500, "Error while adding opening: " + err));
                res.redirect('/openings');
            })
        }
        // Update an opening
        else {
            Openings.findById(req.body._id, (err, opening) => {
                if (err) next(createHttpError(500, "Error while updating opening: " + err));
                if (!req.body.isOpen && opening.isOpen && opening.appliedUsers.length > 0) {
                    opening.appliedUsers.forEach(user => {
                        console.log("Hey " + user + ", " + "the opening for the project " + opening.project + " is now closed.");
                    });
                }
            })
            opening.updateOne(req.body, (err, update) => {
                if (err) next(createHttpError(500, "Error while updating opening: " + err));
                res.redirect('/openings');
            })
        }
    } else {
        next(createHttpError(401, "Only a manager can add an opening"));
    }
});

router.post('/apply/:id', isAuthenticated(), (req, res, next) => {
    Openings.findById(req.params.id, (err, opening) => {
        if (err) next(createHttpError(404, "Error finding opening by id: " + req.params.id));

        if (!opening.appliedUsers.includes(req.user.username)) {
            opening.appliedUsers.push(req.user.username);
            opening.updateOne(opening, (err, update) => {
                if (err) next(createHttpError(500, "Error while applying for opening: " + err));
            })

            Openings.findById(req.params.id, (err, opening) => {
                console.log("Hey " + opening.createdBy + ", " + req.user.username + " has shown interest in the opening for project " + opening.project);
            })
        }

        res.redirect('/openings');
    })
})

module.exports = router;