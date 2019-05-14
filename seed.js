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
        /////////////// Add Menu Items ////////////////
        await upload.addMenuImage("Roast Duck", 22, "It's a delicious food from Beijing, China.","Roast-duck.jpg","image/jpg","public/uploads/menuimages/Roast-duck.jpg")
        await upload.addMenuImage("Lightly Fried Chicken", 19,"Organic chicken, lightly fried until crisp.", "chicken.jpg", "image/jpg", "public/uploads/menuimages/chicken.jpg");
        await upload.addMenuImage("Large Pizza", 17, "One of America's favorite italian foods, topped with pepperoni.","pizza.jpg", "image/jpg", "public/uploads/menuimages/pizza.jpg");
        await upload.addMenuImage("Tacos", 12, "3 Tacos. A classic food from Mexico, but with an American twist.","taco.jpg", "image/jpg", "public/uploads/menuimages/taco.jpg");
        await upload.addMenuImage("Tofu", 9, "A common food from Sichuan, China","tofu.jpg", "image/jpg", "public/uploads/menuimages/tofu.jpg");
        await upload.addMenuImage("Spaghetti", 7, "A popular type of pasta. Served with red sauce.","spaghetti.jpg", "image/jpg", "public/uploads/menuimages/spaghetti.jpg");
        await upload.addMenuImage("French Fries", 5, "Classic American side dish.","french-fries.jpg","image/jpg","public/uploads/menuimages/french-fries.jpg");
    } catch(e) {
        console.log(e);
    }


    try {
        /////////////// Create Users ////////////////
        const phil = await user.addUser("phil@gmail.com","Phil","$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        const id_1 = phil._id;
        const keerthana = await user.addUser("keerthana@gmail.com","keerthana","$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm");
        const id_2 = keerthana._id;
        const patrick = await user.addUser("patrick@gmail.com","Patrick","$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK");
        const id_3 = patrick._id;

       /////////////// Post Reviews ////////////////
        await review.postReview("phil@gmail.com", "Phil Baresi", "3", "The food was very spicy." )
        await review.postReview("keerthana@gmail.com", "Keerthana", "4", "The food was very yummy." )
        await review.postReview("rob@gmail.com"," Rob", "5", "The food was very good. Great atmosphere and good location." )
    } 
    catch(e) {
        console.log(e);
    }

    console.log("Done seeding database");
}
main();
