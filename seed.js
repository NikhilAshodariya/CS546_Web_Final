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
        /////////////// Create User ////////////////
        const test = await user.addUser("test@gmail.com","Patrick","$2b$08$Ky3qN680M7U/a6ZJ4zzrLuFNsHkKuElIt8pD2BmDiE3hKNodnK.bu");
        const id = test._id;

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
