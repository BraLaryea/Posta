const db = require('../util/database');

exports.fecthAll = async (req, res, next) => {
    try {
        const [allPosts] = await db.execute(
            'SELECT * from posts'
        )
        res.status(200).json(allPosts);
    } catch (err) {
        next(err);
    }
}

exports.postPost = async (req, res, next) => {
    try {
        await db.execute(
            'INSERT INTO posts (title, body, user) VALUES (?, ?, ?)', [req.body.title, req.body.body, req.body.user]
        )
        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        db.execute(
            'DELETE FROM posts WHERE id = ?', [req.params.id]
        );
        res.json({ message: 'deleted' })
    } catch (err) {
        next(err);
    }
}
