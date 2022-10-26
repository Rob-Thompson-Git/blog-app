const router = require("express").Router();
const { Post } = require("../../models");

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
            {model: User}
            ]
        })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                {model: User}
            ],
        });
        if (!onePost) {
            res.status(404).json({message: 'No post with that id'});
            return;
        } else {
            res.status(200).json(onePost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const createPost = await Post.create(req.body);
        res.status(200).json(createPost);
    } catch (err) {
        re.status(500).json(err);
    }
});

module.exports = router;