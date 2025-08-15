import express from 'express';
import { connectDB } from './Config/connectDB.js';

const port = 3000;
const app = express();

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