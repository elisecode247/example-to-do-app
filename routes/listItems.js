const express = require('express');
const router = express.Router();

// get listItems for a specific list
router.get('/', function (_req, res) {
    res.json({
        success: true,
        listItems: [
            {id : 1, content: 'do taxes', isComplete: false},
            {id : 2, content: 'wash the car', isComplete: true},
            {id : 3, content: 'buy groceries', isComplete: false},
        ]
    });
});

// add new listItem for a list
router.post('/',function (_req, res) {
    res.json({success: true});
});

// update listItem for a list
router.put('/:listItemId', function (_req, res) {
    res.json({success: true});
});

// delete listItem for a list
router.delete('/:listItemId', function (_req, res) {
    res.json({success: true});
});

module.exports = router;
