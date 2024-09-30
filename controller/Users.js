const model = require("../models/index");
module.exports = {
    async create(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await model.User.create({ username, email, password });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async list(req, res) {
        try {
            const users = await model.User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async retrieve(req, res) {
        try {
            const { id } = req.params;
            const user = await model.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;
            const user = await model.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.update({ username, email, password });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await model.User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}