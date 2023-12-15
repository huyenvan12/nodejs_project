const express = require('express');
const router = express.Router();

const calendarController = require('../app/controllers/CalendarController');

router.get('/:slug', calendarController.show);
router.get('/', calendarController.index);

module.exports = router;
