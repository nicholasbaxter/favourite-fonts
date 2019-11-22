var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Fav = require("../models/Fav");

// @route     GET /favs
// @desc     Get all users favs
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const favs = await Fav.find({ user: req.user.id }).sort({
      date: -1
    });
    console.log(favs);
    res.json(favs);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route     POST /favs
// @desc     Add new favs
// @access     Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const newFav = new Fav({
        name,
        user: req.user.id
      });
      const fav = await newFav.save();
      res.json(fav);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     DELETE /favs/:id
// @desc     Delete fav
// @access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let fav = await Fav.findById(req.params.id);

    if (!fav) return res.status(404).json({ msg: "Font not found" });

    // Make sure user owns fav
    if (fav.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Fav.findByIdAndRemove(req.params.id);

    res.json({ msg: "Fav removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
