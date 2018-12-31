hideMeals();
hideExercise();

    $("#meal-button").on("click", function(event){
        event.preventDefault();
        showMeals();
    });

    $("#exercise-button").on("click", function(event){
        event.preventDefault();
        showExercise();
    });

    // hide/show functions start
    function hideMeals(){
        $("#meal-form").hide();
    }

    function showMeals(){
        $("#meal-button").hide();
        $("#meal-form").show();
    }

    function hideExercise(){
        $("#exercise-areas").hide();
    }

    function showExercise(){
        $("#exercise-button").hide();
        $("#exercise-areas").show();
    }
    // hide/show functions end

    //calorie calculator variables
    var age = 0;
    var weightPounds = 0;
    var sex = "";
    var heightInches = 0;
    var heightFeet = 0;
    // activity factor will be static, 1.4 might change but assumes minimal activity?
    var activityFactor = 1.4;
    var totalHeight = 0;
    

    //on click for calorie result
    $("#calorie-result").on("click", function(event){

        $("#result").empty();

        event.preventDefault();
        age = parseInt($("#calorie-age").val().trim());
        weightPounds = parseInt($("#calorie-weight").val().trim());
        heightFeet = parseInt($("#calorie-height-ft").val().trim())
        heightInches = parseInt($("#calorie-height-inches").val().trim());
        totalHeight = (heightFeet * 12)+heightInches;
        console.log(totalHeight);

        sex = $("input[name=gender]:checked").val();
        console.log(sex);

        targetCalories = computeCalories();
        console.log("Calories: "+targetCalories)

        var spoonURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories="+targetCalories+"&timeFrame=day";

        //ajax for target calories
        $.ajax({
            url: spoonURL,
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
              }
            }).then(function(response){
                var results = response.meals;
                console.log(results);
            
            for (var i = 0; i<results.length; i++){

                var recipeID = results[i].id;
                console.log(recipeID);

                var mealDiv = $("<div>");
                mealDiv.attr("id", "meal-div");

                var mealImg = $("<img>");
                mealImg.attr("id", "meal-image");
                mealImg.attr("src","http://webknox.com/recipeImages/"+ results[i].image);

                var mealTitle = $("<h2>");
                mealTitle.attr("id", "meal-title");
                mealTitle.text(results[i].title);

                mealDiv.append(mealTitle);
                mealDiv.append(mealImg);
                
                $("#result").append(mealDiv);
                
                //ajax for recips
                $.ajax({
                    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+recipeID+"/summary",
                    method: "GET",
                    headers:{
                        'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
                    }
                }).then(function(response){
                
                var recipeData = response.summary;
                console.log(recipeData);
                
                mealDiv.append(recipeData);
                
                });
            }

            });


    });
    //end on click for calorie result

    //formula function for daily calories
    function computeCalories() {
        var sexModifier;
        if (sex === "male") {
          sexModifier = 5;
        } else {
          sexModifier = -161;
        }
        var weightKilograms = weightPounds / 2.20462;
        var heightCentimeters = 2.54 * totalHeight;
        var bmr = (10 * weightKilograms) + (6.25 * heightCentimeters) - (5 * age) + sexModifier;
        return activityFactor * bmr;
      }
      