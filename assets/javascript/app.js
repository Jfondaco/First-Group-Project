var spoonURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day";

hideMeals();
hideExercise();

$.ajax({
    url: spoonURL,
    method: "GET",
    headers: {
        'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
      }
    }).then(function(response){
        console.log(response);
    });

    $("#meal-button").on("click", function(event){
        event.preventDefault();
        showMeals();
    });

    $("#exercise-button").on("click", function(event){
        event.preventDefault();
        console.log("hello");
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
