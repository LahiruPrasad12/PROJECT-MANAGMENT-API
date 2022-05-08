const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")

dotenv.config({ path: './config.env' });



const app = require('./app');
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

const URL= process.env.DATABASE;

mongoose
    .connect(URL,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));