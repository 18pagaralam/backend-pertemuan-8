const express = require('express');
const routerMhs = require('./routes/mahasiswa')
const routerMk = require('./routes/matakuliah')
const routerNilai = require('./routes/nilai')
const app = express();
const port = 2500;
const cors = require('cors')

app.use(express.json());
app.use(cors({
    origin: '*'
}))
app.use(routerMhs)
app.use(routerMk)
app.use(routerNilai)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.listen(port, () => {
    console.log(`server berjalan dengan localhost:${[port]}`)
});