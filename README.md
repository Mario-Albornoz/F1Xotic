## Prerequisites
* React + vite installed
* Tailwind Installed
* Node.js Installed
* Have a sanbox personal Paypal Account to make transactions

## Important
* To use most of the websites features like; Adding items to the shopping cart, creating products, etc 
you must be logged in. To create a user you just need a name and password, which will be stored as a hash in the database.

* When creating product and going back to the shop page you might need to refresh the page one or two times before the new product appears.

## Frontend Setup
1. Clone repository
2. **Install dependencies for the frontend**
    ```console
    cd client
    npm install
    ```

3. **Start the Frontend Server**
   
   Run the front end:
   ```console
   npm run dev
   ```
   The application should be available at: http://localhost:5173/ 
   Even though the back end should support requests from other ports, the prefferably run on port : 5173


## Backend SetUp

4. **Install dependecies**
    ```console
    cd ..
    cd server
    npm install
    ```

5. **Create a .env file with the following information**
    ```console
    MONGO_URI="mongodb+srv://marioalbandino:Hola1234.@ausix.upnoh.mongodb.net/F1Xotics?retryWrites=true&w=majority&appName=Ausix"
    PORT=1337
    JWT_SECRET = MySecretKey
    ```
    This credentials for both JWT are only used in this project that is only meant to run locally, therefore that is why I share the entire Mongo URI and JWT key. The databases attached to that mongo db account will probably be deleted soon too or the credentials might change.
5. **Run backend**
    ```console
    npm run dev
    ```
