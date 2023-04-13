require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/api/todos"));

const PORT = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(PORT, () => console.log(`server is running on port ${PORT} 😃`));
//   } catch (err) {
//     console.log("*******ERROR IN server*******", err);
//   }
// };

// start();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, console.log(`server is running on port ${PORT} 😃`))
  )
  .catch((err) => console.log(err));
