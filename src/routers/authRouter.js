import express from 'express';
import debug from "debug";
const debugAuth = debug('app:authRouter')
import {MongoClient} from 'mongodb';

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{

    const {username, password} = req.body
    const url = "mongodb+srv://joseut76:uoFeCMnSWlRU9k2Y@cluster0.ziadrhk.mongodb.net?retryWrites=true&w=majority";
    const dbName = 'globomantics';

    //self call function
    (async function addUser(){
        let client;
        try {
            client = await MongoClient.connect(url);

            const db = client.db(dbName); 
            const user = { username, password}
            const results = await db.collection('users').insertOne(user);
            debugAuth(results);
            req.login(results.insertedId, ()=>{
                res.redirect('/auth/profile')
            });

        } catch (error) {
            debugAuth(error)
        }
        client.close()
    })();
});


authRouter.route('/profile').get((req, res)=>{
    res.json(req.user);
});

export default authRouter;