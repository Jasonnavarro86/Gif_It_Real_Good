// My object for the game.
var giphyMagic = {
    // Property 1: This is the array holding all the movie buttons.
    myMovies: ["moana", "frozen", "tangled", "the lion king", "mulan", "beauty and the beast", "the little mermaid", "the jungle book"],

    // Property 2: This function() creates the movie buttons and is called everytime a new movie is added. 
    makeButtons: function () {

        $(".buttonsHere").empty();

        for (var i = 0; i < this.myMovies.length; i++) {

            $('<button>').addClass("btn jsonInfo")
                .html(this.myMovies[i]).appendTo(".buttonsHere")
        }
    },
    // Property 3: This function() pushes the users movie choice into the movie array and empties the input box. 
    pushIntoArray: function () {

        $(".searchButton").on("click", function () {
            $(".hideMe").hide()
            event.preventDefault();
            var userInput = $(".gifInput").val();

            giphyMagic.myMovies.push(userInput)
            $(".gifInput").val("");

            giphyMagic.makeButtons();
            giphyMagic.myMovies2();
        })
    },
    // Property 4: This function() calls the giphy API and puts the GIF's on the page when the movie buttons are clicked. 
    myMovies2: function () {

        $(".jsonInfo").on("click", function () {
            $(".hideMe").hide()
            $(".theEmpty").empty();

            var newMovie = $(this).html();

            var movieUrl = "https://api.giphy.com/v1/gifs/search?q=" + newMovie + "&api_key=dc75eaa47ff2402cb92349f140f9aab2&limit=10";

            $.ajax({
                url: movieUrl,
                method: "GET"
            }).done(function (result) {
                
                var jsonGif = result
                for (var i = 0; i < result.data.length; i++) {
                     var myRating = result.data[i].rating;
                     

                    var newImg = $("<img>")
                    newImg.addClass("col btn gifAnimate")
                    newImg.attr("src", result.data[i].images.fixed_height_still.url)
                    newImg.attr("data-status", "still")
                    newImg.attr("data-animate", result.data[i].images.fixed_height.url)
                    newImg.attr("data-still", result.data[i].images.fixed_height_still.url).on("click", function () {

                        if ($(this).data("status") === "still") {
                            $(this).data("status", "moving")
                            $(this).attr("src", $(this).data("animate"))
                        } else {
                            $(this).data("status", "still")
                            $(this).attr("src", $(this).data("still"))
                        }
                    })
                    newImg.appendTo(".spot" + i);
                    $("<h3>").html("Rating: "+ myRating).appendTo(".spot" + i);
                }
            })
        })
    },
}
// These are the three functions being called when the page loads. 
giphyMagic.pushIntoArray();
giphyMagic.makeButtons();
giphyMagic.myMovies2();