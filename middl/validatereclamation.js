const yup = require("yup");
const validatereclamation = async (req, res, next) => {
try {
const Schema = yup.object().shape({
  titre: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().default(() => new Date()),
  statut: yup.string().oneOf(["En attente", "En cours", "Résolue"]).default("En attente"),
  priorite: yup.string().oneOf(["Basse", "Moyenne", "Haute"]).default("Moyenne"),
});
await Schema.validate(req.body);
next();
} catch (err) {
    console.log(err);
    
  }

};

module.exports = validatereclamation;
