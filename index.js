import express from 'express';
import { connectDB } from './Config/connectDB.js';
import userRoutes from './Routes/userRoutes.js'

const port = 3000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Route establishment
app.use('/api',userRoutes);

//DB connection
connectDB();

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Homepage"
    });
});

app.listen(port, ()=> {
    console.log(`The server is listening on port no.: ${port}`);
})