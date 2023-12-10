const validateUser = (req, res, next) => {
    // Implement your validation logic here based on req.body
    const { username, email, password } = req.body;

    // Example: Check if required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    console.log("user validated");
    next();
};

module.exports = validateUser;
