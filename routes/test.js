const express = require('express');
const router = express.Router();

const {
    getTest,
    syncDBtables
} = require('../controllers/testController')

router.route('/')
    .get(getTest)

router.route('/sync')
    .get(syncDBtables)

module.exports = router;