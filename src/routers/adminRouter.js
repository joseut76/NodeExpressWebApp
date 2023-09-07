import express from "express";
import debug from "debug";
import {MongoClient} from 'mongodb';
import sessions from '../data/sessions.json' assert { type: "json" };

const debugAdmin = debug('app:adminRouter')
const adminRouter = express.Router();

adminRouter.route('/').get((req,res)=>{
    const url = "mongodb+srv://joseut76:uoFeCMnSWlRU9k2Y@cluster0.ziadrhk.mongodb.net?retryWrites=true&w=majority";
    const dbName = 'Cluster0';//'globomantics';

    // async function run() {
    async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url)
            debugAdmin("Connected to mongo DB");
            console.log("Connected to mongo DB");
            const db = client.db(dbName)
            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        } catch (error) {
            debugAdmin(error.stack);
            console.log(error.stack);
        }
        client.close();        
    }
    mongo();
    
});

export default adminRouter;

