import { Router } from "express";

const router = Router();

/**
 * A simple login logout +  Redirect example through cookie
 */

const loginCheck = (request, response, next) => {

    const userpass = request.cookies.userpass;

    if (userpass) {
        return next();
    }

    response.redirect(301, '/api/unauthorized');

};

router.get('/signup', (request, response) => {

    response.cookie('userpass', 'a13579', { maxAge: 30000000});

    response.send({msg: "You have succcessfully Signedup"});

});

router.get('/login', loginCheck, (request, response) => {

    response.send('You have successfully logged in');

});


router.get('/unauthorized', (request, response) => {


    response.send({
        msg: "You are a unAuthorized user. Please Signup First",

    });

});


router.get('/logout', (request, response) => {


    response.clearCookie('userpass');

    response.send("You are Successfully logged out");

});


export default router;