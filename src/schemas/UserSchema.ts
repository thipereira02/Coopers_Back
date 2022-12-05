import joi from "joi";

const signUpSchema = joi.object({
    username: joi.string().trim().min(3).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

const loginSchema = joi.object({
    username: joi.string().trim().min(3).required(),
    password: joi.string().pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/).required(),
});

export { signUpSchema, loginSchema };