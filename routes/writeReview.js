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
            ////console.log("hitsssss herehbdcfahbd  me")
            const reviewList = await review.getAllReview();
            //res.render("review",{title:"Reviews" , ReviewList:reviewList, noError:true})

            if (req.cookies.name === 'AuthCookie') {
              // const thisUser = await users.getUserById(req.session.user._id)
              res.render("writeReview",{title:"Reviews" , ReviewList:reviewList, noError:true, auth: true})
            } 
            else {
              res.render("writeReview",{title:"Reviews" , ReviewList:reviewList, noError:true})
            }
        //}
        
    }
    catch(e){
        console.log('Error is found ', e);
  res.sendStatus(500).json({error: e.toString() || 'Server Error', route: req.originalUrl});
    }

  });

  router.post("/", async (req, res) => {
    console.log("aswedfrthy")
   
    try {
        const newReview = await review.postReview(
          req.body.user_emailId,
          req.body.name,
          req.body.stars,
          req.body.comment
        );
        res.redirect("/writeReview")
        //res.status(200).json(newReview);
      } catch (e) {
        console.log("am just caught here")
        const reviewList = await review.getAllReview();
        res.status(401);
        res.render("writeReview",{title:" Reviews",errorfound:"Please fill all the fields",ReviewList:reviewList, noError:true});
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
   
  });



module.exports = router;