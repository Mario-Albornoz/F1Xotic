## Welcome to F1xotic
This is a moder E-commerce website, that levarages three.js, react, and vite to render and display interactive 3D models.
You can "buy" Formula 1 cars here that are divided in different categories. You can add them to your shopping cart, access product cards, and a view of all the products.

## How to run

**Pre-requisites**
 1. Node.js
 2. Paypal Sandbox Developer Account

## Frontend Setup
1. **Install dependencies for the frontend**
    ```console
    cd client
    npm install
    ```
2. **Configure Environment Variables**
   
   In the frontend folder, create a .env file and add:
   ```console
   REACT_APP_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
   ```

4. **Start the Frontend Server**
   
   Run in the frontend folder:
   ```console
   npm run dev
   ```