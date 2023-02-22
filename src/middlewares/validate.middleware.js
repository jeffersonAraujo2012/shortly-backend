export default function validate(schema) {
  return (req, res, next) => {
    const data = req.body;
    const resultValidate = schema.validate(data, {abortEarly: false});

    if (resultValidate.error) {
      return res.status(422).send(resultValidate.error.details);
    }

    next();
  };
}
