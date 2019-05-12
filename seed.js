const dbConnection = require("./config/mongoConnection");
const Db = require("mongodb").Db;
// const data = require("./data");
const {
    menu,
    user,
    review,
    upload
} = require("./data")

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    try {
        await upload.addMenuImage("Roast duck", 12, "It's a delicious food from Beijing, China.","Roast-duck.jpg","image/jpg","public/uploads/menuimages/Roast-duck.jpg")
        await upload.addMenuImage("French fries", 6, "It's a food from USA","french-fries.jpg","image/jpg","public/uploads/menuimages/french-fries.jpg");
    } catch(e) {
        console.log(e);
    }


    try {
        const phil = await user.addUser("phil@gmail.com","Phil","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        const id_1 = phil._id;
        const keerthana = await user.addUser("keerthana@gmail.com","keerthana","$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm");
        const id_2 = keerthana._id;
        const patrick = await user.addUser("patrick@gmail.com","Patrick","$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK");
        const id_3 = patrick._id;
        // const user_email3 = patrick.email;
        // console.log(user_email3);
        // const rob = await user.addUser("rob@gmail.com","Phill","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        // const id = rob._id;
        // // const alex = await user.addUser("phil@gmail.com","Phill","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        // const id = alex._id;
        // const john = await user.addUser("phil@gmail.com","Phill","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        // const id = john._id;
        // const rita = await user.addUser("phil@gmail.com","Phill","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        // const id = rita._id;
        //console.log(phil)
        // const firstReview = await review.addReview( String(id_1),"2018-05-27","5","The food was very tasty");
        // const secondReview = await review.addReview( String(id_2),"2018-04-29","4","The food was very yummy");
        // const thirdReview = await review.addReview( String(id_3),"2018-02-26","3","The food was very spicy");
        const fourthReview = await review.postReview("phil@gmail.com","Phill Baresi","3","The food was very spicy" )
        const fifthReview = await review.postReview("keerthana@gmail.com", "Keerthana","4","The food was very yummy" )
        const sixthReview = await review.postReview("rob@gmail.com"," Rob","5","The food was very tasty" )

       // console.log(firstReview)
    } catch(e) {
        console.log(e);
    }

    console.log("Done seeding database");
}
main();
