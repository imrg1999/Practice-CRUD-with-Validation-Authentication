import express from 'express';

const port = 3000;
const app = express();



app.get('/', (req,res) => {
    res.status(200).json({
        message: "Homepage"
    });
});

app.listen(port, ()=> {
    console.log(`The server is listening on port no.: ${port}`);
})