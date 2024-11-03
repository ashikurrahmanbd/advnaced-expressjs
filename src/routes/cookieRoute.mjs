import { Router } from "express";

const router = Router();

/**
 * Cookie Implementation
 *
 * -> recommended package is cookie-parser
 */

//set Cookie
router.get('/set-cookie', (request, response) => {


    //once we run this route this cookie will be set to browser cookie which will be availabble only for
    //30 seconds. During this time you can access this cookie by request.cookies
    response.cookie('username', 'ashikurrahmancookie', { maxAge: 30000});

    response.send('Cookie has been set ');

});

//get Cookie
router.get('/get-cookie', (request, response) => {

    const username = request.cookies.username;

    response.send('Cookie retrived '+ username);

});

/**
 * End of Cookies Implementationn
 */


export default router;