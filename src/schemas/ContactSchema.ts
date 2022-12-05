import joi from "joi";

const contactSchema = joi.object({
    name: joi.string().trim().min(2).required(),
    email: joi.string().trim().email().required(),
    telephone: joi.string().trim().min(11).required(),
    text: joi.string().trim().required(),
});

export { contactSchema };