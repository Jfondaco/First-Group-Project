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

    var activityFactor = 1.4;
    var age = 0;
    var weightPounds = 0;
    var heightFeet = 0;
    var heightInches = 0;
   
    //on click for calorie result
    $("#calorie-result").on("click", function(event){
        event.preventDefault();

        age = parseInt($("#calorie-age").val().trim());
        weightPounds = parseInt($("#calorie-weight").val().trim());
        heightFeet = parseInt($("#calorie-height-ft").val().trim())
        heightInches = parseInt($("#calorie-height-inches").val().trim());
        
        sex = $("input[name=gender]:checked").val();
        console.log(sex);

        $("#age-div").empty();
        $("#weight-div").empty();
        $("#height-div").empty();

        var hasError = false;

        if (isNaN(age) || age === 0){
            var enterAge = $("<div>");
            enterAge.text("Please Enter Your Age");
            enterAge.attr("id", "enter-age");
            $("#age-div").append(enterAge);
            hasError = true;
        }
        if (isNaN(weightPounds) || weightPounds === 0){
            var enterWeight = $("<div>");
            enterWeight.text("Please Enter Your Weight");
            enterWeight.attr("id", "enter-weight");
            $("#weight-div").append(enterWeight);
            hasError = true;
        }
        
        if (isNaN(heightFeet) || heightFeet === 0){
            var enterHeight = $("<div>");
            enterHeight.text("Please Enter Your Height");
            enterHeight.attr("id", "enter-height");
            $("#height-div").append(enterHeight);
            hasError = true;
        }

        if (isNaN(heightInches)) {
            heightInches = 0;
        }
        
        $("#meal-plan-result").empty();

        if (hasError) {
            return false;
        }

        totalHeight = (heightFeet * 12)+heightInches;
        console.log(totalHeight);

        targetCalories = computeCalories();
        console.log("Calories: "+targetCalories)

        var calorieDiv = $("<div>");
        calorieDiv.text("Your Target Calories: "+Math.floor(targetCalories));
        calorieDiv.addClass("calorie-div-class");
        $("#meal-plan-result").append(calorieDiv);

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

                let recipeID = results[i].id;
                console.log(recipeID);

                var mealDiv = $("<div>");
                mealDiv.addClass("meal-div-class");
                mealDiv.attr("id", "meal-div"+recipeID);

                var mealImg = $("<img>");
                mealImg.addClass("meal-image-class");
                mealImg.attr("id", "meal-image"+recipeID);
                mealImg.attr("src","http://webknox.com/recipeImages/"+ results[i].image);

                var mealTitle = $("<h2>");
                mealTitle.addClass("meal-title-class")
                mealTitle.attr("id", "meal-title"+recipeID);
                mealTitle.text(results[i].title);

                let itemRecipeDiv = $("<div>");

                mealDiv.append(mealTitle);
                mealDiv.append(itemRecipeDiv);
                mealDiv.append(mealImg);
                
                $("#meal-plan-result").append(mealDiv);
                
                    //ajax for recipes
                    $.ajax({
                        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+recipeID+'/information?includeNutrition=false',
                        method: "GET",
                        headers:{
                            'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
                        }
                    }).then(function(response){
                        var itemRecipe = response.spoonacularSourceUrl;
                        console.log("item recipe: "+itemRecipe);
                        
                        var itemRecipeAnchor = $("<a></a>");            
                        itemRecipeAnchor.attr("href", itemRecipe);
                        itemRecipeAnchor.attr("target", "_blank");
                        itemRecipeAnchor.html("Recipe")
                        itemRecipeAnchor.addClass("itemRecipeAnchor");

                        itemRecipeDiv.append(itemRecipeAnchor);
                    });

                        //ajax for recipe summaries
                        $.ajax({
                            url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+recipeID+"/summary",
                            method: "GET",
                            headers:{
                                'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
                            }
                        }).then(function(response){
                        
                        console.log("recipe id: "+recipeID)
                        var recipeSummary = response.summary;
                        console.log(recipeSummary);
                        
                        $("#meal-div"+recipeID).append(recipeSummary);
                        
                        });
            }

            $("#meal-plan-result")[0].scrollIntoView();

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
      

      //Text Animation
      $(function(){
        $(".text").hover(function(){
          $(this).removeClass("hidden");
        }, function (){
          $(this).addClass("hidden");
        });
      });