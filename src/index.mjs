import express from 'express';

import cookieParser from 'cookie-parser';

import session from 'express-session';

import passport from 'passport';






import userRoutes from './routes/usersRoutes.mjs';

import validateFormDateRoute from './routes/validateFormDataRoute.mjs';

import cookRoutes from './routes/cookieRoute.mjs';

import loginLogoutRoutes from './routes/loginLoutRoute.mjs';

import sessionLoginLogoutRoutes from './routes/sessionLoginLogoutRoutes.mjs';

import passportRoute from './routes/passportRoute.mjs';




//initialize the app
const app = express();


//allowing the express to take data from the body
app.use(express.json());

// to parse or extract the URL-encoded Bodies
app.use(express.urlencoded({ extended: true }));

//a simple HTTP cookies through use of cookieParser middleware for entireapp
app.use(cookieParser());

//use session + session configuration
app.use(session({
    secret: 'ashik-qwertyuioplkjhgfdsazxcvbnm',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 // 1 hour time
    }
}));


// Initialize Passport and allow it to manage sessions -> after the app main session by express-session
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3000;




/**
 * A simple Get Route  with a middleware
*/
app.get('/', (request, response) => {

    console.log(request.session);
    console.log(request.session.id);
    
    response.send({

        sessionid: request.session.id

    });

});


//all users related rotue
app.use('/api', userRoutes);

//validation example route
app.use('/api', validateFormDateRoute);

//cookie Route
app.use('/api', cookRoutes);

//login logout routes
app.use('/api', loginLogoutRoutes);

//sessin Route
app.use('/api', sessionLoginLogoutRoutes);


//passport route
app.use(passportRoute);








app.listen(PORT, () => {
    console.log("The Server is Running at "+PORT);
});

