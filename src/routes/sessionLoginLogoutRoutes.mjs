import { Router } from "express";
import { users } from "../data/data.mjs";

import bcrypt from 'bcryptjs';

const router = Router();


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).send('You are not authenticated');
    }
};


router.post('/session-login', async (request, response) => {


    const {username, password} = request.body

    //find the user in the local data.mjs
    const findAdmin = users.find((user) => {

        return user.username === username;

    });

    if(!findAdmin){
        return response.status(400).send("user not found!");
    }

    const isMatch = await bcrypt.compare(password, findAdmin.password);

    if(!isMatch){
        return res.status(400).send('Invalid credentials');
    }

    request.session.user = {
        id: findAdmin.id,
        username: findAdmin.username
    }

    response.send("Login Successful");


});


// Logout route
router.post('/session-logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logged out successfully');
    });
});


//try to access new route

router.get('/newpage', isAuthenticated, (request, response) => {

    response.send("You are on this page");

});


export default router;