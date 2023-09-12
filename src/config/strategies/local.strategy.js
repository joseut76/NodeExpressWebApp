import passport from 'passport'
import {Strategy} from 'passport-local'
import {MongoClient} from 'mongodb';
import debug from "debug";

//used to validate user against database, other strategies can be social using for example facebook or google
export default function localStrategy(){
    const debugLocalStrategy = debug('app:local.strategy')
    passport.use('local', new Strategy({
        //pass the name of the fields that will be used to validate user
        usernameField: 'username',
        passwordField: 'password'

        //creates an user object with the information
    }, (username, password, done)=>{
        const url = "mongodb+srv://joseut76:uoFeCMnSWlRU9k2Y@cluster0.ziadrhk.mongodb.net?retryWrites=true&w=majority";
    const dbName = 'globomantics';
    (async function validateUser(){
        let client; 
        try {
            client= await MongoClient.connect(url)
            debugLocalStrategy("Connected to mongo DB");
            
            const db = client.db(dbName)
            const user = await db.collection('users').findOne({username});
            if(user && user.password === password){
                done(null, user)
            } else {
                done(null, false)
            }


        } catch (error) {
            done(error, false);            
        }
        client.close(); 
    }())
    }));
};