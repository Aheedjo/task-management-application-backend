import express from "express";
import bodyParser from "body-parser";
import routes from "./route/index.js"

const app = express();
const port = 3050;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'welcome to task manager back-end'
    });
});

app.use(routes);

app.listen(port, () => {
    console.log(`Task manager backend listening on port ${port}`);
});