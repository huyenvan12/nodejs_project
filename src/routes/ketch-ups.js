const express = require('express');
const router = express.Router();

const ketchupsController = require('../app/controllers/KetchUpController');

router.get('/create', ketchupsController.create);
router.post('/store', ketchupsController.store);
router.get('/:id/edit', ketchupsController.edit);

router.post('/handle-form-actions', ketchupsController.handleFormActions);
router.put('/:id', ketchupsController.update);
router.patch('/:id/restore', ketchupsController.restore);

router.delete('/:id/permanent', ketchupsController.destroy);
router.delete('/:id', ketchupsController.softErase);
router.get('/:slug', ketchupsController.show);

module.exports = router;
