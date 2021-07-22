const express = require('express');
const router = express.Router();

const guard = require('./guard');

const postController = require('../controller/post');

router.get('/', guard, postController.fecthAll);

router.post('/', guard, postController.postPost);

router.delete('/:id', guard, postController.deletePost)

module.exports = router;