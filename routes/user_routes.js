// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const validateUser = require('../middl/user_validator');

// Create a new user
router.post('/add', validateUser, async (req, res) => {
    try {
        const newUser = await userController.createUser(req.body);
        res.status(201).send("User created!");
        console.log("User Created:\n" + newUser);
    } catch (error) {
        res.status(500).send("" + error);
        console.error("Error in user creation: \n" + error);
    }
});

// Get all users
router.get('/list', async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user by ID
router.get('/get/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userController.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("" + error);
    }
});

// Update user by ID
router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const updatedUser = await userController.updateUserById(userId, req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("User updated: \n" + updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send("" + error);
        console.error('Error updating user:\n');
        console.error(error);
    }
});

// Delete user by ID
router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await userController.deleteUserById(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).send("User deleted!");
    } catch (error) {
        res.status(500).send("" + error);
    }
});

// Socket login route
// Route to render the user login page
router.get('/login', (req, res) => {
    res.render("user");
});

module.exports = router;
