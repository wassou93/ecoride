const User = require('../models/user');

// Create a new user
const createUser = async (userData) => {
    try {
        const user = new User(userData);
        console.log("new User:");
        console.log(user);
        console.log(userData);
        return await user.save();
        c
    } catch (error) {
        throw error;
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw error;
    }
};

// Get user by ID
const getUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw error;
    }
};

// Update user by ID
// const updateUserById = async (userId, updateData) => {
//     try {
//         return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true, context: "query" });
//     } catch (error) {
//         throw error;
//     }
// };

const updateUserById = async (userId, updateData) => {
    try {
        // Find the user by ID and update
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true, runValidators: true });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        throw error;
    }
};

// Delete user by ID
const deleteUserById = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw error;
    }
};

// Socket controllers
// Helper function to check credentials (replace with your authentication logic)
async function checkCredentials(credentials) {
    // extract the username and password
    const { username, password } = credentials;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If the user is not found, credentials are invalid
        if (!user) {
            return false;
        }

        // Verify the provided password against the stored hashed password and return result
        return user.verifyPassword(password);
    } catch (error) {
        console.error('Error checking credentials:', error);
        return false;
    }
}

// Helper function to get user details (replace with your user data retrieval logic)
async function getUserDetails(username) {
    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If the user is not found, return null or handle accordingly
        if (!user) {
            return null;
        }

        // Return an object containing user details
        return {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            country: user.country,
            address: user.address,
            language: user.language,
            sex: user.sex,
            isonline: user.isonline,
        };
    } catch (error) {
        console.error('Error getting user details:', error);
        return null;
    }
}

async function updateUserStatus(userid, newstatus) {
    try {
        await updateUserById(userid, {isonline: newstatus});
        } catch (error) {
        console.error('Error updating user status:', error);
        return null;
    }
}
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    // Socket controllers
    checkCredentials,
    getUserDetails,
    updateUserStatus
};