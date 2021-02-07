const express = require('express');
const router = express.Router();

// get lists for a specific user
router.get('/', function (_req, res) {
    res.json({
        success: true,
        lists: [
            {id : 1, title: 'Today', description_text: 'Things I need to do today'},
            {id : 2, title: 'Tomorrow', description_text: 'Things I need to do tomorrow'},
        ]
    });
});

// add new list for a user
router.post('/',function (_req, res) {
    res.json({success: true});
});

// update list for a user
router.put('/:listId', function (_req, res) {
    res.json({success: true});
});

// delete list for a user
router.delete('/:listId', function (_req, res) {
    res.json({success: true});
});

module.exports = router;
