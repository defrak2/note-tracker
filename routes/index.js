const router = require('express').Router();

//Import routers for /notes 
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;