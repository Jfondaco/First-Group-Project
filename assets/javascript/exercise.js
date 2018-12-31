var exerciseGroups = {
  "abs": [
      {name: "Russian Twist",
      time: "1 minute",
      reps: "10 each side",
      sets: "2",
      instructions: [
        "Assume a sit-up position with your back flat and abs tight. Hold both hands together in front of your stomach and bend your elbows. Raise your feet about 6 inches off the ground and bend your knees.", 
      "Keeping your core tight, slowly bring your gripped hands to your right hip. Briefly hold this position before returning it to center.",    
      "Repeat Step 2 to your left hip. Continue alternating back and forth. Make sure you are moving slowly and maintaining control.",
      "For a more advanced workout, perform the steps above using a 5 or 10lb medicine ball or weight."
        ],
      },
  ],

  "back": [
      {name: "Hip Lifts",
      time: "1 minute",
      reps: "15",
      sets: "3",
      instructions: [
        "Lie on your back with your knees bent and with your arms flat on the floor on either side of you.",
        "Holding this position, slowly lift your midsection off the ground, using your legs, arms and shoulders to balance. Hold in an elevated position for 10 seconds, and slowly lower to starting position, relaxing the core muscles."
        ],
      },
  
  ],

  "biceps": [
      {name: "Bicep Curls with Leg",
      time: "1 minute",
      reps: "10",
      sets: "3",
      instructions: [
        "While seated, use your right hand to reach under your left thigh, and hold your thigh just above the back of your knee.",
        "Pull that leg up as high as you can. Keep this from being too easy by intentionally making sure that you do not use any leg muscles at all to help with the lift.",
        "Switch to your other side after 10 repitions."
        ],
      },
    {name: "hammer curl",
  },
  ],

  "cardio": [
      {name: "Side to Side Punches",
      time: "2 minutes",
      instructions: [
        "Stand with your feet wider than hip distance apart and turn your body to the right, putting most of your weight on your right leg.",
        "Punch out to the right side with your left arm, then bring your right leg in towards your left as you ‘skip’ up, lifting both arms overhead.",
        "Land with most of your weight on you left leg as you punch out with your right arm."
        ],
      },
  ],

  "chest": [
      {name: "Proper Push-Ups",
      reps: "10",
      sets: "2",  
      instructions: [
        "When down on the ground, set your hands at a distance that is slightly wider than shoulder-width apart.",
        "Your feet should be set up in a way that feels right and comfortable to you.",
        "Your head should be looking slightly ahead of you, not straight down.",
        "At the top of your push up, your arms should be straight and supporting your weight.",
        "Once your chest touches the floor (or your arms go down to a 90 degree angle), push back up to starting position."
        ],
      },
  ],

  "glutes": [
      {name: "Bodyweight Squat",
      time: "1 minute",
      reps: "20 reps",
      sets: "2",
      instructions: [
        "Start standing with feet just slightly wider than shoulder-width apart.",
        "Sit your butt back into a squat, without letting your knees go past your toes. Make sure your weight is in your heels, and keep your chest up.",
        ],
      },
  ],

  "legs": [
    {name: "Foot Over Toe",
    time: "1 minute",
    reps: "10 on each leg",
    sets: "3",
    instructions: [
        "Sit on the ground with your back against a wall and your legs out straight in front of you. Squeeze your quads tight enough to pick your heels up off the floor.",
        "Raise the heel of your one foot as high as you can over the toe of the other leg without bringing it in towards the middle. Do not let this leg go all the way back to the floor.",
        ],
      },
  ],

  "shoulders": [
    {name: "Pike Push-Ups",
      reps: "10",
      sets: "3",
      instructions: [
        "Assume a pushup position on the floor. Your arms should be straight and your hands should be shoulder-width apart.",
        "Now lift up your hips so that your body forms an upside down V. Your legs and arms should stay as straight as possible.",
        "Bend your elbows and lower your upper body until the top of your head nearly touches the floor. Pause, and then push yourself back up until your arms are straight."
        ],
      },
  ],

  "triceps": [
    {name: "Tricep Dip",
    reps: "15",
    sets: "3",
    instructions: [
        "While sitting on a chair, grip the edge of the seat with your hands and stretch your legs out in front of you.",
        "Move your body forward so that your feet are flat, your arms are bent behind you holding you up, and your body is extended above the ground.",
        "Slowly raise and lower your body using your triceps."
        ],
      },
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
