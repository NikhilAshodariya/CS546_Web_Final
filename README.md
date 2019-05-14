# CS546_Web_Final
Final project of Web Programming CS546


## Setup
1. Install all dependencies as listed in package.json
2. Edit mongo settings in config/config.json (if needed) and use command line to start mongodb
3. Seed the database with command such as "node seed"
4. Use "npm start" to start the application
5. Use browser to access the app at http://localhost:3000/

## Usage

### User Access
Users can log in using the nav link in the top right of the site. Clicking this will bring them to a login page. If they do not have an existing account, there is a link in the login from to create a new account. 

A user account has been added to the database with the following credentials:
  * Email: test@gmail.com
  * Name: Patrick
  * Password: phill123
  
### Leaving A Review
User should navigate to the Reviews page (in top nav bar). At the top of the page, there is a form to be filled out to leave a review. All reviews are shown on the page below.
User need not login he can simply use captcha and leave a review

### Placing An Order
There are quite a few ways to place an order:
1. If the user is not currently logged in:
  * User can go to menu page.
  * On any item in the menu, there is a link to log in to place order. Click it.
  * Once logged in, the user page shows a "Place An Order" button. Click it.
  * Now the user sees the menu again, and can click "Add to Cart" for an item they want.
  * It will then show them their cart. From there they can continue browsing menu or check out.
  * Once the cart has all desired items, click "Checkout". 
  * The user will see a confirmation alert that the order has been placed.
  * This order is shown in the "Your Orders" card within the "My Account" page.
  
2. If the user is logged in already:
  * User can go to menu page.
  * The user can click "Add to Cart" for an item they want.
  * It will then show them their cart. From there they can continue browsing menu or check out.
  * Once the cart has all desired items, click "Checkout". 
  * The user will see a confirmation alert that the order has been placed.
  * This order is shown in the "Your Orders" card within the "My Account" page.


