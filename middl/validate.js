const yup = require("yup");

// Define a validation schema using Yup
<<<<<<< HEAD
const validate = async(req, res, next) => {
    try {
        const Schema = yup.object().shape({
            FName: yup.string().required("Name is required")

=======
const validate = async (req, res, next) => {
    try {
        const Schema = yup.object().shape({
            nom: yup.string().required("Le nom est requis"),
            //description: yup.string().required("La description est requise"),
            //prix: yup.number().required("Le nombre est requis")
>>>>>>> 9a4c62a2c35b85c59f5f44c846d7f113892c5652
        });

        // Validate the request body against the schema
        await Schema.validate(req.body);

        // If validation is successful, proceed to the next middleware
        next();

    } catch (err) {
<<<<<<< HEAD
        console.log(err);
        res.status(404).send(err);
=======
        console.error(err);

        // Respond with a 400 Bad Request status and the validation errors
        res.status(400).json({ error: err.errors || "Une erreur de validation est survenue" });
>>>>>>> 9a4c62a2c35b85c59f5f44c846d7f113892c5652
    }
};

module.exports = validate;