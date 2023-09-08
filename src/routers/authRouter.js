import express from 'express';
import debug from "debug";
import {MongoClient, ObjectId} from 'mongodb';

const debugAuth = debug('app:sessionsRouter')
const authRouter = express.Router();


authRouter.route('/signUp').post((req, res)=>{
    res.json(req.body)
})


export default authRouter;