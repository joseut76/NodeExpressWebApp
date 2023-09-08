import express from 'express';
// import debug from "debug";
// const debugAuth = debug('app:sessionsRouter')

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    req.login(req.body, ()=>{
        res.redirect('/auth/profile');
    });
});

authRouter.route('/profile').get((req, res)=>{
    res.json(req.user);
});

export default authRouter;