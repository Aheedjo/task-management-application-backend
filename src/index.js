import express from "express";

const app = express();
const port = 3050;

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'welcome to task manager back-end'
    });
});

app.listen(port, () => {
    console.log(`Task manager backend listening on port ${port}`);
});