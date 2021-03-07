const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Business = require("../models/Business");

// @route   GET api/business
// @desc    GET business details
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const business = await Business.find({ user: req.user.id });

    res.json(business[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/all", async (req, res) => {
  try {
    const business = await Business.find();

    res.json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/business
// @desc    Edit business details
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const {
    name,
    email,
    businessName,
    industry,
    description,
    productDetails,
    address,
    phone,
    url,
  } = req.body;

  // Build business object
  const businessFields = {};

  if (name) businessFields.name = name;
  if (email) businessFields.email = email;
  if (businessName) businessFields.businessName = businessName;
  if (industry) businessFields.industry = industry;
  if (description) businessFields.description = description;
  if (productDetails) businessFields.productDetails = productDetails;
  if (address) businessFields.address = address;
  if (phone) businessFields.phone = phone;
  if (url) businessFields.url = url;

  try {
    let business = await Business.findById(req.params.id);

    // Make sure user owns business
    if (business.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    business = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: businessFields },
      { new: true }
    );

    res.json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      businessName,
      industry,
      description,
      productDetails,
      address,
      phone,
      url,
    } = req.body;

    try {
      let business = await Business.findOne({ businessName });

      if (business) {
        return res.status(400).json({ msg: "business already exists" });
      }

      const newBusiness = new Business({
        name,
        email,
        businessName,
        industry,
        description,
        productDetails,
        address,
        phone,
        url,
        user: req.user.id,
      });

      business = await newBusiness.save();

      res.json(business);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
