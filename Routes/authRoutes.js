import express from 'express';
import { 
    registrationController,
    loginController,
    testController,
    forgotPasswordController,
    allUsersController
    } from '../controller/authController.js';

import { 
    requireSignin, 
    isAdmin 
    } from '../middewares/authMiddleware.js';

const router = express.Router();


//Router

//register route
router.post('/register', registrationController);

//login route
router.post('/login', loginController);

//test controller route
router.get('/test',requireSignin, isAdmin, testController);

//forgot password controller
router.post('/forget-password', forgotPasswordController);

//protected routes
router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({ok: true,});
});

//all users route
router.get('/all-users', requireSignin, isAdmin, allUsersController);

//admin auth
router.get('/admin-auth', requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ok: true,});
});

export default router;