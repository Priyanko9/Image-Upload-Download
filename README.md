# Image-Upload-Download

This is mainly a node and express image upload and resizing app with very little UI.The backend is built using node,express and mongoose.For handling images multer library has been used.To resize an image sharp library has been used.
In this application one can register a user and then the user can login.After login the user can upload an image to the dashboard.The uploaded image will be resized and saved to the database.
Only the images that are created by one particular user will be accessible only to that user.
The authentication has been done using bcrypt and JWT packages.
All the images will be stored into the database as well as in the images folder for refernce.

# Installation

For node run npm install from the node directory
For client go to the client directory and then run npm install

# start

For starting the app run both the client as well as the node server by running npm start
