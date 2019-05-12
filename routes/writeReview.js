const router = require("express").Router();

const { user, review } = require("../data");

router.get("/", async (req, res) => {
    //console.log(req.session.username);
    try{
        // if(req.session.username){
        //     //console.log("hitsssss here")
        //     res.redirect("/private")
        // }
        //else{
            //console.log("hitsssss herehbdcfahbd  me")
            res.render("writeReview",{title:"Write A Review", noError:true})
        //}
        
    }
    catch(e){
        console.log('Error is found ', e);
  res.sendStatus(500).json({error: e.toString() || 'Server Error', route: req.originalUrl});
    }

  });

  router.post("/writeReview", async (req, res) => {
    //console.log(req.session.username)
   try{
    try {
        const newReview = await review.postReview(
          req.body.email,
          req.body.stars,
          req.body.comment
        );
        //const userList = await user.getAllUsers();
        let review_get = {};
        let Review_User = [];
            review_get = {
               _id: newReview._id,
               user_emailId: newReview["user_emailId"],
               stars: newReview["stars"],
               comment: newReview["comment"]
             };

            Review_User.push(review_get);
          
        //}
        res.status(200).json(newReview);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    
    
    // if(req.session.username){
    //     //console.log("hitsssss here")
    //     res.redirect("/private")
    // }
    // else {
    //    if(req.body.username === undefined || req.body.username.length === 0 || req.body.password.length === 0)
    //    {
    //     res.status(401);
    //     res.render("login/login",{title:"Error Found",errorfound:"Error Found enter valid username or password"});
    //    }
          //else{
    //   const userName = req.body.username;
    //   const passWord = req.body.password;
    //   let flag = true;
    //   for(let i = 0; i<userData.length; i++){   
       
    //     if(userName === userData[i]['username']){
    //       //console.log(userName + " " + userData[i]['username'] + "asfafdadfadfadfadfad")
    //       let pass = await bcrypt.compare(passWord,userData[i]['hashedPassword'])
    //       //console.log(pass + " " + userData[i]["hashedPassword"]+ " " + passWord)
    //       if(  pass === true  ){
            
    //       //console.log("hits here pocolo")
    //       flag = false;
    //       req.session.username = userData[i]['username']
    //       req.session.firstname = userData[i]['firstName']
    //       req.session.lastname = userData[i]['lastName']
    //       req.session._id = userData[i]['_id']
    //       req.session.profession = userData[i]['profession']
    //       req.session.bio = userData[i]['bio']
        
    //       }
    //     }
         
    //     }                      
        
    //     if(flag === true){
    //         res.status(401).render("login/login",{title: "Login Page", errorfound:"user or password doesnt match  please check"})
    //     }
    //     else {
    //         if (req.session.username){
    //             res.redirect("/private")}
    //             }
       // }
    // }
   }
   
   catch(e){
    console.log('Error is found', e);
    res.status(500).json({error: e.toString() || 'Server Error', route: req.originalUrl});
   }
  });



module.exports = router;