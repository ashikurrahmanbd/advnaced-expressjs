import bcrypt from 'bcryptjs';
import { Router } from 'express';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { users } from '../data/data.mjs';

const router = Router();;



// Configure Passport Local Strategy (username/password login)
passport.use(new LocalStrategy(
    async (username, password, done) => {
        // Find user by username
        const user = users.find(user => user.username === username);

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        // Check if the password is correct (compare the hashed password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // If both username and password match, return the user
        return done(null, user);
    }
));

// Serialize and deserialize user (to store user data in the session)
passport.serializeUser((user, done) => {
    done(null, user.id); // Save user ID to the session
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user); // Retrieve full user from the session using ID
});

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Routes

// Login page (GET)
router.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username">
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password">
            </div>
            <button type="submit">Login</button>
        </form>
    `);
});

// Login form (POST)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to the dashboard on success
    failureRedirect: '/login' // Redirect back to login on failure
}));

// Dashboard route (protected)
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome, ${req.user.username}! This is your dashboard.`);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});



export default router;