const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require("path");

const userSchema = new mongoose.Schema({
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    username: { type: String, required: true, unique: true }, //
    sex: { type: String, default: "" }, // Add your specific fields
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: ""},
    address: { type: String, default: "" },
    country: { type: String, default: "Tunisia" },
    language: { type: String, default: "english"},
    profilepicture: { type: String, default: path.join(__dirname, '..', '..', 'public', 'images', 'user_avatar.png') },
    isonline: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
    creationdate: { type: Date, default: Date.now },
    updatedate: { type: Date, default: Date.now  },
    birthdate: { type: Date, default: Date.now  },
    role: { type: String , default: "regular" },
    password: { type: String, required: true },
});

//Hash the password before saving to the database
userSchema.pre('validate', function (next) {
    const user = this;
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (!update.password) {
        console.log("PASSWORD NOT CHANGED!");
        return next();
    }

    console.log("PASSWORD HAS CHANGED, STARTING REHASHING!");

    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(update.password, salt);
        update.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});


// Verify if the provided password matches the stored hashed password
userSchema.methods.verifyPassword = function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
