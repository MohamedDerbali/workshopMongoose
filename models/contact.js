const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true  },
    Phone: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("contacts", contactSchema, "contacts");
