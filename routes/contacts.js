const express = require("express");
const router = express.Router();
const contactModel = require("../models/contact");

router.get("/", async (req, res) => {
  try {
    const contacts = await contactModel.find({}); // []
    res.render("form", { contacts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/addContact", (req, res) => {
  // <=>
  // const FullName = req.body.FullName;
  // const Phone = req.body.Phone;
  //pour ajouter on utilise la methode save()
  try {
    const { FullName, Phone } = req.body;
    const newContact = new contactModel({ FullName, Phone });
    newContact.save();
    res.redirect("/contacts");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/removeContact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // contactModel.findOneAndDelete({_id: id});
    await contactModel.findByIdAndDelete(id);
    res.redirect("/contacts");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/updateContact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactInfo = await contactModel.findOne({ _id: id });
    // const contactInfo = await contactModel.findById(id);
    res.render("editContact", { contactInfo });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/mettreajours/:id", async (req, res) => {
    try {
        const { FullName, Phone } = req.body;
        const { id } = req.params;
        await contactModel.findByIdAndUpdate(id, { FullName, Phone });
        res.redirect("/contacts");
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});
module.exports = router;
