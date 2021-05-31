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

to switch your branch from 'main' to [your own brance name].

## To download updated code
Open terminal on the directory you did `git clone` (maybe "HCI_Project_Meal_Consultant/") then

`git pull`

`npm install`

Then openning and closing your local server is same with above.

## Project scheme
1. If you open your local server first, there will be "database/meal_list.json", and "uploadedimages/" will be created (it there weren't) as well as "database/stocks.json" and "database/meal_record.json" which are empty file at first.
2. "uploadedimages/" is the space for the images that users will upload whlie adding ingredients by images. The images name will be randomly assigned.
3. "database/stocks.json" is the data of ingredients that user input. The structure is below.
```
./database/stocks.json

{
  "ingredient1 name": {
    "limit_duration": Number,                         // Maximum days the ingredient can be maintained -ex) 20
    "date_list": [Date String, ...],                  // Array of the dates user bought each ingredient instance -ex) ["2021-05-28T00:00:00.0000", ...],
    "img": {
      "src": "uploadedimages/<filename>",             // Path to the uploaded image file
      "detectionBox": [[<x0>, <y0>], [<x1>, <y1>]]    // A pair of coordinates where the ingredient is placed in the "src" image file
    }
  },
  "ingredient2 name": {
    ...
  },
  ...
}
```
For now, `"limit_duration"` is just fixed for `20`. It has to vary with ingredients, but for that we need to collect data first.
If user add the ingredient by text, there will be no uploaded image so that there may be error on `home` page. Hence we also have to set default images for the ingredients with no uploaded image.

4. "database/meal_list.json" is the data of ingredients needed to cook each meal. The structure is blow.
```
./database/meal_list.json
{
  "meal1_name": {
    "ingredients": [
      {
        "name": "ingredient1 name",   // Name of the first ingredient for the meal
        "count": <x>                  // Number of the ingredient needed for the meal
      },
      {
        "name": "ingredient2 name",
        "count": <y>
      },
      ...
    ],
  },
  "meal2_name": {
    ...
  },
  ...
}
```
5. "database/meal_record.json" is the data of ingredients needed to cook each meal that user has cooked. The structure is similar with `"database/meal_list.json"` except there is additional information `"meal_date"` for each meal. The structure is below.
```
./database/meal_list.json
{
  "meal1_name": {
    "meal_date": Date String,         // Date when user eat the meal. I think it has to be changed as Array for multiple dates.
    "ingredients": [
      {
        "name": "ingredient1 name",   // Name of the first ingredient for the meal
        "count": <x>                  // Number of the ingredient needed for the meal
      },
      {
        "name": "ingredient2 name",
        "count": <y>
      },
      ...
    ],
  },
  "meal2_name": {
    ...
  },
  ...
}
```
