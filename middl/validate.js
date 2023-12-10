const yup = require("yup");

// Define a validation schema using Yup
const validate = async (req, res, next) => {
    try {
        const Schema = yup.object().shape({
            nom: yup.string().required("Le nom est requis"),
            //description: yup.string().required("La description est requise"),
            //prix: yup.number().required("Le nombre est requis")
        });

        // Validate the request body against the schema
        await Schema.validate(req.body);

        // If validation is successful, proceed to the next middleware
        next();

    } catch (err) {
        console.error(err);

        // Respond with a 400 Bad Request status and the validation errors
        res.status(400).json({ error: err.errors || "Une erreur de validation est survenue" });
    }
};

module.exports = validate;