const {check, validationResult} = require('express-validator')


//---------------SignUp Validator---------------//
exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firsName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('LastName is required'),
    check('email')
    .notEmpty()
    .withMessage('email is required'),
    check('password')
    .isLength({min : 6})
    .withMessage('Password must be at least 6 charactere'),
];


//---------------SignIn Validator---------------//
exports.validateSigninRequest = [
    check('email')
    .notEmpty()
    .withMessage('email is required'),
    check('password')
    .isLength({min : 6})
    .withMessage('Password must be at least 6 charactere'),
];


exports.isRequestValidated = (req,res ,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0 ){
        return res.status(400).json({errors : errors.array()[0].msg})
    }
    next();
}