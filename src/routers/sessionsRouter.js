import express from 'express';
import debug from "debug";
import {MongoClient, ObjectId} from 'mongodb';
import speakerService from '../services/speakerService.js';

const debugSession = debug('app:sessionsRouter')
const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next)=>{
    if(req.user){
        next()
    }else {
        res.redirect('/auth/signin');
    }
})

sessionsRouter.route('/').get((req, res)=>{
    const url = "mongodb+srv://joseut76:uoFeCMnSWlRU9k2Y@cluster0.ziadrhk.mongodb.net?retryWrites=true&w=majority";
    const dbName = 'globomantics';
    (async function mongo(){
        let client; 
        try {
            client= await MongoClient.connect(url)
            debugSession("Connected to mongo DB");
            
            const db = client.db(dbName)
            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions',{sessions});
        } catch (error) {
            debugSession(error.stack);            
        }
        client.close();        
    })();

});

//get the id passed in the params
sessionsRouter.route('/:id').get((req, res)=>{
    const id = req.params.id
    const url = "mongodb+srv://joseut76:uoFeCMnSWlRU9k2Y@cluster0.ziadrhk.mongodb.net?retryWrites=true&w=majority";
    const dbName = 'globomantics';
    
    (async function mongo(){
        let client; 
        try {
            client= await MongoClient.connect(url)
            debugSession("Connected to mongo DB");
            
            const db = client.db(dbName)
            const session = await db.collection('sessions')
            .findOne({_id: new ObjectId(id)});

            const speaker = await speakerService.getSpeakerById(session.speakers[0].id)
            session.speaker = speaker.data;

            res.render('session',{session});
        } catch (error) {
            debugSession(error.stack);            
        }
        client.close();        
    })();  
});

export default sessionsRouter;