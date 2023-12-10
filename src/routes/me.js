const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/ketch-ups', meController.storedKetchUps);
router.get('/trashed/ketch-ups', meController.trashedKetchUps);

module.exports = router;
