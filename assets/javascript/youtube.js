var apiKey = "AIzaSyDEUO74WPq56MPIa7k-BD1seFBaLK6sfBI";

function buildSearchUrl(query) {
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet"
  url += "&q=" + encodeURIComponent(query);
  url += "&key=" + apiKey;
  return url;
}

function buildIframeUrl(id, width, height) {
  var url = "https://youtube.com/embed/" + id + "?ecver=1&iv_load_policy=1&rel=1&autohide=2&color=red";
  url += "&width=" + width;
  url += "&height=" + height;
  return url;
}

function searchExerciseAndAddToId(exercise, resultId) {
  $.ajax({
    method: "GET",
    url: buildSearchUrl(exercise),
  }).then(function(response) {
    for(var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      
      var division = $("<div>");
  
      var paragraph = $("<p>");
      paragraph.text(item.snippet.title);
      division.append(paragraph);
  
      var width = 280;
      var height = 160;
  
      var iframe = $("<iframe>")
      iframe.attr("allowFullScreen", "allowFullScreen");
      iframe.attr("src", buildIframeUrl(item.id.videoId, width, height));
      iframe.attr("width", width);
      iframe.attr("height", height);
      iframe.attr("allowTransparency", "true");
      iframe.attr("frameborder", 0);
      division.append(iframe);
  
      $("#" + resultId).append(division);
    }
  });
}
