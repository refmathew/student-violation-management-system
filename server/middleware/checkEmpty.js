const checkEmpty = (req, res, next) => {
  const values = Object.values(req.body);
  let hasEmptyValue = false;

  values.forEach((value) => {
    if (!value) hasEmptyValue = true;
  })

  hasEmptyValue
    ? res.status(400).send({ success: false, message: "Please submit non empty fields" })
    : next()
}

module.exports = checkEmpty;
