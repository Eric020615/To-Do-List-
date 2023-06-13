const { Router } = require('express');
const calendar_Controller = require('../controllers/calendarController')
const router = Router();

router.post('/calendar',calendar_Controller.calendar_get);

module.exports = router;