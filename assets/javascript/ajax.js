

// show array of dances
var danceTypes = ["Tango", "Breakdance", "Swing Dance", "Tap Dance", "Salsa", "Moonwalk"];
renderButtons()

function displayContentInfo() {

    var content = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + content + "&api_key=Yd7ip6wRdw3MUeypbvgc1DkzOpXUfJhk&limit=10";

    // Creates AJAX call for the specific dance button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var contentDiv = $("<div>");
            contentDiv.addClass("gif");


            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var contentImage = $("<img>");
            contentImage.addClass("movement");
            // Setting the src attribute of the image to a property pulled off the result item
            contentImage.attr("src", results[i].images.fixed_height_still.url);
            contentImage.attr("data-still", results[i].images.fixed_height_still.url);
            contentImage.attr("data-animate", results[i].images.fixed_height.url);
            contentImage.attr("data-state", "still");



            // Appending the paragraph and image tag to the contentDiv
            contentDiv.append(p);
            contentDiv.append(contentImage);

            // Prependng the contentDiv to the HTML page in the "#gifs-appear-here" div
            $("#dance-content").prepend(contentDiv);


        }



        $(".movement").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

        // Prependng the contentDiv to the HTML page in the "#gifs-appear-here" div
        $("#dance-content").prepend(contentDiv);


    })
}


// Function for displaying dance data
function renderButtons() {

    // Deletes the dances prior to adding new dances
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of dances
    for (var i = 0; i < danceTypes.length; i++) {

        // Then dynamicaly generates buttons for each dance in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of dance to our button
        a.addClass("dance");
        // Added a data-attribute
        a.attr("data-name", danceTypes[i]);
        // Provided the initial button text
        a.text(danceTypes[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a dance button is clicked
$("#add-dance").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var content = $("#dance-input").val().trim();

    // Adding dance from the textbox to our array
    danceTypes.push(content);

    // Calling renderButtons which handles the processing of our dance array
    renderButtons();
});
// Adding a click event listener to all elements with a class of "dance"
$(document).on("click", ".dance", displayContentInfo);


// Calling the renderButtons function to display the intial buttons
renderButtons();


