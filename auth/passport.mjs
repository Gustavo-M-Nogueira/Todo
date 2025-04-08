import passport from "passport";
import { Strategy } from 'passport-local';
import { User } from "../schemas/user.mjs";
import { comparePassword } from "./passwordHash.mjs";

passport.use(
    new Strategy(
        { usernameField: 'name', passwordField: 'password' },
        async (name, password, done) => {
        try {
            const user = await User.findOne({ name });
            if (!user) 
                throw new Error("User not found");  
            if (!comparePassword(password, user.password)) 
                throw new Error("Invalid Credentials");
            done(null, user);
        } catch (error) {
            done(error, null); 
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        if (!user) 
            throw new Error('User not found');
        
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export function applyPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
};

export default passport;