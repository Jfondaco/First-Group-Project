var apiKey = "AIzaSyDEUO74WPq56MPIa7k-BD1seFBaLK6sfBI";

function buildSearchUrl(query) {
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet";
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

function searchExerciseAndAppend(exercise, resultElement) {
  $.ajax({
    method: "GET",
    url: buildSearchUrl(exercise + " tutorial"),
  }).then(function(response) {
    var limit = Math.min(3, response.items.length);

    for(var i = 0; i < limit; i++) {
      var item = response.items[i];
      
      var division = $("<div>");
      division.addClass("youtube-video");
  
      var title = $("<p>");
      title.addClass("youtube-video-title");
      title.text(item.snippet.title);
      division.append(title);
  
      var width = 240;
      var height = 135;
  
      var iframe = $("<iframe>");
      iframe.attr("allowFullScreen", "allowFullScreen");
      iframe.attr("src", buildIframeUrl(item.id.videoId, width, height));
      iframe.attr("width", width);
      iframe.attr("height", height);
      iframe.attr("allowTransparency", "true");
      iframe.attr("frameborder", 0);
      division.append(iframe);
  
      resultElement.append(division);
    }
  });
}
