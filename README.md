# HCI_Project_Meal_Consultant

## To get start
Open terminal on the directory you want to work then

`git clone https://github.com/AnGyeIn/HCI_Project_Meal_Consultant.git`

`cd HCI_Project_Meal_Consultant`

`npm install`

Then open your local server by

`npm start`

And type "localhost:3000" on your browser then you can test your work.

To finish your local server, type `Ctrl+C` in your terminal that running the server.

## Before modifying the codes, please switch your branch for safe
On your terminal

`git branch [your own branch name]`

Then new branch named [your own branch name] is created and type in

`git checkout [your own branch name]`

to switch your branch from 'main' to [your own branch name].

## To download updated code
Open terminal on the directory you did `git clone` (maybe "HCI_Project_Meal_Consultant/") then

`git pull`

`npm install`

Then openning and closing your local server is same with above.

## Project scheme
There are some `static files` that are needed in advance for running the program, as well as some `dynamic files` that created when the local server begins running. It is ok to remove `dynamic files` for test of new user, but `static files` have to be kept.

### `static files`
1. `database/ingredients_info.json` file has an object whose keys are names of ingredients and values are maximum days to maintain each ingredient.
```
./database/ingredients_info.json

{
  "ingredient1_name": Number,   // Maximum days the ingredient can be maintained
  "ingredient2_name": Number, 
  ...
}
```
2. `database/meal_list.json` file has an object whose keys are names of meals and values are the object of information of each ingredient.
```
./database/meal_list.json

{
  "meal1_name": {
    "ingredients": [                  // Array of the ingredients of the meal
      {
        "name": "ingredient1_name",   // Name of the first ingredient in the array
        "count": Number               // Number of ingredient needed for the meal
      }, {
        "name": "ingredient2_name",   // Name of the second ingredient in the array
        "count": Number
      }, ...
    ]
  },
  "meal2_name": {
    "ingredients: [
      ...
    ]
  },
  ...
}
```
### `dynamic files`
1. `database/meal_record.json` file has an object whose keys are names of meals that the user has cooked and values are the object of information of the cooking.
```
./database/meal_record.json

{
  "meal1_name": {
    "meal_date": "YYYY-MM-DD",        // Date when the user cooked the meal
    "ingredients": [                  // Array of ingredients user used for cooking the meal
      {
        "name": "ingredient1_name",   // Name of the first ingredient in the array
        "count": Number               // Number of ingredient needed for the meal
      }, {
        "name": "ingredient2_name",   // Name of the second ingredient in the array
        "count": Number
      }, ...
    ],
    "imgsrc": "img_file_path"         // Path to the image file that user uploaded on calendar
  },
  "meal2_name: {
    "meal_date": "YYYY-MM-DD",
    "ingredients": [
      ...
    ],
    "imgsrc": "img_file_path"
  },
  ...
}
```
2. `database/MLresponse.json` file has an object which is the response from the server of object detection model when the user uploaded his or her image to register ingredients to our system. You can find details of the response object from [here](https://cloud.google.com/vision/automl/object-detection/docs/predict).
3. `database/recommended.json` file has an array of names of the meals that our system had recommended to the user. The most lately recommended meal is the first element of the list.
```
./database/recommended.json

["meal1_name", "meal2_name", ... ]
```
4. `database/stocks.json` file has an object whose keys are names of ingredients that the user has registered in our system and values are the object of information of each ingredient.
```
./database/stocks.json

{
  "ingredient1_name": {
    "limit_duration": Number,                 // Maximum days the ingredient can be maintained
    "date_list": [Date String, ...],          // Array of the dates user bought each ingredient -ex) ["2021-05-28T00:00:00.0000", ...]
    "img": {
      "src": "img_file_path",                 // Path to the image file that user uploaded when he or she register the ingredient
      "detectionBox": [[x0, y0], [x1, y1]]    // A pair of coordinates where the ingredient is placed in the "src" image file
    }
  },
  "ingredient2_name": {
    ...
  },
  ...
}
```
5. `uploadedImages` directory has image files that the user uploaded while using our system.
