const yup = require("yup");
const addToDate = require("date-fns/add");
const createError = require("http-errors");

const fileSchema = yup.object().shape({
  filename: yup.string().required(),
  fileURI: yup.string().required(),
  created: yup.date().default(new Date()).required(),
  expires: yup
    .date()
    .min(new Date())
    .max(addToDate(new Date(), { months: 1 }))
    .required(),
  downloads: yup.number().min(1).max(16).optional(),
  downloadCount: yup.number().min(0).max(16).optional(),
});

module.exports = async (file) => {
  try {
    const { value, error } = await fileSchema.validate(file, {
      abortEarly: false,
    });
    if (error)
      throw new createError(400, "File is invalid", { errors: error.errors });
  } catch (error) {
    console.error(error);
    throw new createError(500, "Something went wrong", { errors: error });
  }
};
