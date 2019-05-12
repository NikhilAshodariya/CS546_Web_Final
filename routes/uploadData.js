const express = require("express");
const data = require("../data");
const uploadData = data.upload;
const router = express.Router();
const multer = require("multer");
const path = require("path");

// For storing Images & Videos
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp') {
    callback(null, './public/uploads/menuimages');
    } else {
    callback(null, false);
  }
  },
  filename: function (req, file, callback) {
    callback(null, (new Date().toISOString().replace(/:/g, '_') + file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp' )
    callback(null, true);
  else
    callback(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000024 * 10000024 * 60000
  },
  fileFilter: fileFilter
});


router.post("/",upload.single('file'), async (req, res) => {
  try {
  let filetype= req.file.mimetype;
    if (filetype == 'image/png' || filetype == 'image/jpeg' || filetype == 'image/bmp') {
        try {
            const newList = await uploadData.addMenuImage(
                req.body.name,
                req.body.price,
                req.body.description,
                req.file.originalname,
                req.file.mimetype,
                (req.file.path).replace(/\\/g, "/")
            )
        } catch (e) {
        res.status(500).json({
          error: e
            });
        }
     }
    res.redirect("/menu");
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }

});

router.get("/:id", async (req, res) => {
  let getMenu = await uploadData.getById(req.params.id);
  let arrExt = getMenu.mMimetype;
    if (arrExt == 'image/png' || arrExt == 'image/jpeg' || arrExt == 'image/bmp') {
        mMenu = JSON.stringify(getMenu);
        res.render("menu/openmenu", { menu: JSON.parse(mMenu), css: "openmenu.css" });
    }
});
module.exports = router;