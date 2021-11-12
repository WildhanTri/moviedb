This is an application to search for movie information. You need to enter the keyword of the movie you want to know. I made my own auto complete and infinity scroll. You can select movies based on the auto complete list or by pressing the search button.

Libraries used:
- bootstrap 5
- font-awesome
- react-redux
- react-router-dom
- axios

Data Sources:
http://www.omdbapi.com/ - Get your token here http://www.omdbapi.com/apikey.aspx

Pre-Requisite :
Create an .env variable in your root directory. Then enter these 2 variables
- REACT_APP_OMDBAPI_API_ENDPOINT=http://www.omdbapi.com/
- REACT_APP_OMDBAPI_API_TOKEN={your http://www.omdbapi.com token}

How to run this project locally :
1. Clone this repo
2. run "npm install"
3. after finished, then run "npm start"
4. Open in browser, go to http://localhost:3000

Demos:
https://triherlian-moviedb-app.herokuapp.com/