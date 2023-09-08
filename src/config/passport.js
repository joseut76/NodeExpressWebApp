import passport from 'passport'
// import localStrategy from './startegies/local.strategy'

export default function passportConfig(app){
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done)=>{
        done(null,  user)
    });

    passport.deserializeUser((user, done)=>{
        done(null,  user)
    });
}