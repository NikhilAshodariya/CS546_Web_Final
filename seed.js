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
        await upload.addMenuImage("Chicken", 6,"It's a fried chicken", "chicken.jpg", "image/jpg", "public/uploads/menuimages/chicken.jpg");
        await upload.addMenuImage("Pizza", 12, "A big cuisine with lots of meat","pizza.jpg", "image/jpg", "public/uploads/menuimages/pizza.jpg");
        await upload.addMenuImage("Spaghetti", 12, "A kind of noodles with meat","spaghetti.jpg", "image/jpg", "public/uploads/menuimages/spaghetti.jpg");
        await upload.addMenuImage("Taco", 6, "A special food in Mexico","taco.jpg", "image/jpg", "public/uploads/menuimages/taco.jpg");
        await upload.addMenuImage("Tofu", 12, "A common food from Sichuan, China","tofu.jpg", "image/jpg", "public/uploads/menuimages/tofu.jpg");
        //await upload.addMenuImage("Kung-Pao Chicken", 12, "A delicious cut-up chicken food","Kung-Pao Chicken.jpg", "image/jpg", "public/uploads/menuimages/Kung-Pao Chicken.jpg")
        //await upload.addMenuImage("Sweet and sour fillet", 12, "A sweet and sour flavor food","Sweet and sour fillet.jpg", "image/jpg", "public/uploads/menuimages/Sweet and sour fillet.jpg")
        //await upload.addMenuImage("Yang’s Braised Chicken", 12, "A spicy cuisine procuced by chicken","Yang’s Braised Chicken.jpg", "image/jpg", "public/uploads/menuimages/Yang’s Braised Chicken.jpg");
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
       ///////////////PostReview////////////////
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
