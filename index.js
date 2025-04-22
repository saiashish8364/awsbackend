const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

const PORT = process.env.PORT;
console.log(PORT);

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    })
  )
  .catch((error) => console.error(error));

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).send();
  }
});
