var exerciseGroups = {
  "abs": [
    {name: "sit ups",
    time: "1 minute",
  },
  ],
  "back": [
    {name: "pull up"},
  ],
  "biceps": [
    {name: "dumbell curl"},
    {name: "hammer curl"},
  ],
  "cardio": [
    {name: "jump rope"},
  ],
  "chest": [
    {name: "bench press"},
  ],
  "glutes": [
    {name: "squat"},
  ],
  "legs": [
    {name: "leg press"},
  ],
  "shoulders": [
    {name: "seated dumbbell shoulder press"},
  ],
  "triceps": [
    {name: "dips"},
  ],
};

var exercisePickCount = 1;

function makeArrayCountingUpward(limit) {
  var array = [];
  for (var i = 0; i < limit; i++) {
    array.push(i);
  }
  return array;
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function onButtonClick() {
  var value = $(this).val();
  var group = exerciseGroups[value];

  var indices = makeArrayCountingUpward(group.length);
  shuffle(indices);

  $("#exercise-result").empty();

  for(var i = 0; i < exercisePickCount; i++) {
    var exercise = group[indices[i]];
    
    var division = $("<div>");

    var heading = $("<h2>");
    heading.text(exercise.name);
    division.append(heading);

    var description = $("<p>");
    description.text("Describe how to perform the lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    division.append(description);
    division.addClass("results-div");

    var recommendations = $("<div>");
    recommendations.addClass("recommendations");
    searchExerciseAndAppend(exercise.name, recommendations);
    division.append(recommendations);

    $("#exercise-result").append(division);
  }
}

$(document).ready(function() {
  $("#abs-button").click(onButtonClick);
  $("#back-button").click(onButtonClick);
  $("#biceps-button").click(onButtonClick);
  $("#cardio-button").click(onButtonClick);
  $("#chest-button").click(onButtonClick);
  $("#glutes-button").click(onButtonClick);
  $("#legs-button").click(onButtonClick);
  $("#shoulders-button").click(onButtonClick);
  $("#triceps-button").click(onButtonClick);
});
