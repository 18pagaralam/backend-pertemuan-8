const express = require('express');
const app = express();
const session = require('express-session')
const port = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('tidak terautentikasi');
    }
};

app.post('/login', (req,res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.isAuthenticated = true;
        res.send('login sukses')
    } else {
        res.status(401).send('Kredensial Tidak Valid');
    }
});

app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('logout');
        }
    });
});

app.get('/protected', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (GET)')
});

app.post('/protected', authenticate, (req, res) => {
    res.send('Route terproteksi (POST)');
});

app.put('/protected', authenticate, (req, res) => {
    res.send('Route terproteksi (PUT)');
});

app.delete('/protected', authenticate, (req, res) => {
    res.send('Route terproteksi (DELETE)');
});

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`)
});