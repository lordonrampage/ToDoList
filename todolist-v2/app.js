const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/date.js");

const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:27017/toDoListDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

const itemSchema = new mongoose.Schema({
  item: String,
});

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({ item: "Mango" });
const item2 = new Item({ item: "Apple" });

const defaultItems = [item1, item2];

const listSchema = new mongoose.Schema({
  name: { type: String, item: [itemSchema] },
});

const List = mongoose.model("List", listSchema);

let day = "";

app.get("/", function (req, res) {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { ListTitle: "Today", items: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  let newItem = req.body.newItem;
  const newItemToInsert = new Item({ item: newItem });
  newItemToInsert.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  // console.log(req.body.checkbox);
  toBeDeleted = req.body.checkbox;
  // Item.find({ _id: toBeDeleted }).remove(() => {
  //   res.redirect("/");
  // });

  Item.findByIdAndDelete({ _id: toBeDeleted }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted");
    }
    res.redirect("/");
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;

  List.findOne({ name: customListName }, function (err, listFound) {
    if (!err) {
      if (!listFound) {
        // create a new list
        const list = new List({ name: customListName, item: defaultItems });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //   show an existing list
        res.render("/" + customListName, {
          ListTitle: customListName.name,
          items: listFound.item,
        });
      }
    } else {
      console.log(err);
    }
  });
});

// app.get("/work", function (req, res) {
//   res.render("list", { ListTitle: "Work list", items: workItems });
// });

app.post("/work", function (req, res) {
  let workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server has started at port 3000");
});
