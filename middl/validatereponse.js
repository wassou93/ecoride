const yup = require("yup");
const validatereponse = async (req, res, next) => {
try {
const Schema = yup.object().shape({
  contenu: yup.string().required(),
  date: yup.date().default(() => new Date()),
});
await Schema.validate(req.body);
next();
} catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
 };

module.exports = validatereponse;
