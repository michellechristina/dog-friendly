# Ruff Spots
A collaborative app for finding dog friendly places near you


## App Capabilities
1. [How to start the app](#how-to-set-up-and-start-the-app)
2. [Search Page](#search-page)



## How To Set Up And Start The App
First install your npm packages - enter the following into your command line:  
`npm install`  
To start the app:  
`node server.js`  
It's highly recommended to install Sequelize CLI & mysql2 globally:  
`npm i -g mysql2`  
`npm i -g sequelize-cli`  
To seed your DB:
Start the app first. Make sure you are in the project root folder, open a new terminal & enter:  
`sequelize db:seed:all`  

## Search Page
<!-- ![show product database](/images/1.png) -->
1st api call - enter zip code & when you click out of the input box, google geocode is queried & lat/longitude is returned.  
2nd api call - enter place & on submit, google places is queried & then the places DB. Place IDs are compared for both data sets.   
If a match --> return matched data to browse.html. Data is returned via local storage.  
If no match --> return 5 random google places to results.html. Data is returned via local storage.  

Currently browse.html is returning test data.  
Results.html is returning actual data.  

**To Recreate a TRUE outcome (matched ruff spots. redirected to browse.html)**  
type into search inputs: 03867 & The Commons  

OR Use Postman with the following endpoint (GET)  
localhost:8080/api/places/the+commons/43.3104064/-70.99034379999999  

**To Recreate a FALSE outcome (no matched ruff spots. redirected to results.html)**  
type into search inputs: 03867 & Church  

OR Use Postman with the following endpoint (GET)  
localhost:8080/api/places/church/43.3104064/-70.99034379999999  