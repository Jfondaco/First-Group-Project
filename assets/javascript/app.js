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
    var sex;
    var heightInches = 0;
    // activity factor will be static, 1.4 might change but assumes minimal activity?
    var activityFactor = 1.4;

    //on click for calorie result
    $("#calorie-result").on("click", function(event){
        event.preventDefault();
        age = $("#calorie-age").val().trim();
        weightPounds = $("#calorie-weight").val().trim();
        heightInches = $("#calorie-height").val().trim();
        sex = $("##########")

        targetCalories = computeCalories();
        console.log("Calories: "+targetCalories)

        var spoonURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories="+targetCalories+"&timeFrame=day";

        $.ajax({
            url: spoonURL,
            method: "GET",
            headers: {
                'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
              }
            }).then(function(response){
                console.log(response);
            });


    });
    //end on click for calorie result

    //formula function for daily calories
    function computeCalories(weightPounds, heightInches, age, sex, activityFactor) {
        var sexModifier;
        if (sex === "male") {
          sexModifier = 5;
        } else {
          sexModifier = -161;
        }
        var weightKilograms = weightPounds / 2.20462;
        var heightCentimeters = 2.54 * heightInches;
        var bmr = (10 * weightKilograms) + (6.25 * heightCentimeters) - (5 * age) + sexModifier;
        return activityFactor * bmr;
      }
      