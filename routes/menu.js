const router = require('express').Router();

const {
  menu,
  upload
} = require('../data');

// GET todos/
router.get('/', async (req, res) => {
  try{
    let foodList = await upload.getAll();
    foodList.forEach(element => {
      let arrExt = element.mMimetype;
      if(arrExt == "image/png" || arrExt == "image/jpeg" || arrExt == "image/bmp") {
        element.img = true;
      }
    })
    // console.log(foodList);
    res.render("menu/menu", {food: foodList, css: "some.css"})
    // res.status(200).json(foodList);
  } catch(e) {
    res.render("menu/menu", {errMsg: e});
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     let food = await menu.getById(req.params.id);
//     res.status(200).json(food);
//   } catch(e) {
//     res.status(404).json({error:e});
//   }
// })

router.post('/', async (req, res) => {
  try {
    let name = req.body.search;
    let result = await menu.getByName(name);
    let List = result;
    let Liststr = JSON.stringify(result);
    List.forEach(element => {
      let arrExt = element.mMimetype;
      if(arrExt == "image/png" || arrExt == "image/jpeg" || arrExt == "image/bmp") {
        element.img = true;
      }
    });
    if(Liststr == JSON.stringify([])) {
      res.render("menu/menu", {errMsg: "Menu not found"});
    } else {
      res.render("menu/menu", {food: List, css: "some.css"})
    }
  } catch(e) {
    res.render("menu/menu", {errMsg: e});
  }
})

module.exports = router;

