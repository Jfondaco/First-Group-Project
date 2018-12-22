var spoonURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day";

$.ajax({
    url: spoonURL,
    method: "GET",
    headers: {
        'X-RapidAPI-Key': "zM5QZP2R1kmshOJ36ahyXh8O0o5zp1Pf94ojsnoBY9BXmViWZq"
      }
    }).then(function(response){
        console.log(response);
    });

    $("#MYBUTTONPLACEHOLDER").on("click", function(event){
        event.preventDefault();

    });

    function showMeals(){
        $("#MEALPLANBUTTONPLACEHOLDER").style.display = "none";
        $("#MEALPLANFORMPLACEHOLDER").style.display = "block";
    }