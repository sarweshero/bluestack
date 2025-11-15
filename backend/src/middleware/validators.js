import { body, validationResult } from 'express-validator';
import createError from 'http-errors';

export const registerValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars'),
  body('full_name').notEmpty().withMessage('Full name required'),
  body('gender').isIn(['m','f','o']).withMessage('Invalid gender'),
  body('mobile_no').notEmpty().withMessage('Mobile number required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(createError(400, errors.array().map(e=>e.msg).join(', ')));
    next();
  }
];

export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(createError(400, errors.array().map(e=>e.msg).join(', ')));
    next();
  }
];

export const companyValidation = [
  body('company_name').notEmpty().withMessage('Company name required'),
  body('address').notEmpty().withMessage('Address required'),
  body('city').notEmpty().withMessage('City required'),
  body('state').notEmpty().withMessage('State required'),
  body('country').notEmpty().withMessage('Country required'),
  body('postal_code').notEmpty().withMessage('Postal code required'),
  body('industry').notEmpty().withMessage('Industry required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(createError(400, errors.array().map(e=>e.msg).join(', ')));
    next();
  }
];
