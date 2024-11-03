import { Router } from "express";

import { check, validationResult } from 'express-validator';

const router = Router();


router.post('/validate-form-data',[

    check('name').isLength({min: 3}).withMessage('Minium letter should be 3'),

    check('email').isEmail().withMessage('the email you putted is not a valid email'),

    check('age').isNumeric().withMessage('please provide a numeric value'),


], (request, response) => {

    
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    // No validation errors, proceed to access form data
    const { name, email, age } = request.body;

    response.status(200).json({
        msg: 'Form data is valid',
        name,
        email,
        age
    });
    

})

export default router;