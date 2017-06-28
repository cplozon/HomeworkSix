var animalSearches = ["Rhino", "Lion", "Bear", "Kitten"];

function displayAnimalInfo(animal) {
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL + " animal: " + animal);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var results = response.data
    
    for (var i = 0; i < results.length; i++) { 
      console.log(results[i]);         // for loop to display results to search query
      var animalDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);  // creates a p to hold the ratings

      var animalImage = $("<img>");                             // creats an image to hold the images with fixed height
      animalImage.attr("src", results[i].images.fixed_height.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "animate");
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.addClass("cat");
      animalDiv.prepend(p);
      animalDiv.prepend(animalImage);

      $("#gifs-appear-here").prepend(animalDiv);

    }     // closes for loop
  });  // closes function response
} // closes function displayanimal info

function renderButtons() {
  $("#new-buttons").empty();                                  // empty for new button
  for (var j = 0; j < animalSearches.length; j++) {             // Looping the array of animals
    var a = $("<button>");
    a.addClass("animal");                                   // creating buttons from the array
    a.attr("data-name", animalSearches[j]);                 // gets name for button
    a.text(animalSearches[j]);  
    $("#new-buttons").append(a);                            // adds the name for the new button
  } //closes the for loop
}  //closes function renderButtons
 
$("#add-animal").on("click", function(event) {            // when the button is clicked, a function takes input from the text
  event.preventDefault();
  var animal = $("#new-input").val().trim();
  animalSearches.push(animal);                          //adds animal to array           
  renderButtons();                               // Calling renderButtons which handles the processing of our animal array
});             


$(document).on("click", ".animal", function(){
  var animal = $(this).attr('data-name');
  displayAnimalInfo(animal);
});      // Adding a click 

renderButtons();

$(document).on("click", ".cat", function() {                    // function that stops and starts gifs
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
