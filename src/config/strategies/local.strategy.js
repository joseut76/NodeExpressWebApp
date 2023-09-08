import passport from 'passport'
import {strategy} from 'passport-local'

//used to validate user against database, other strategies can be social using for example facebook or google
export default function localStrategy(){

    passport.use(new strategy({
        //pass the name of the fields that will be used to validate user
        usernameField: 'username',
        passwordField: 'password'

        //creates an user object with the information
    }, (username, password, done)=>{
        const user = {username, password, 'name':'Jonathan'}
        done(null, user);
    }));
};