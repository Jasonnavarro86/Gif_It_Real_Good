var myMovies = ["aladdin", "lion king", "mulan", "beauty and the beast", "moana", "toy story", "the jungle book"];

function makeButtons() {
    $(".buttonsHere").empty();

    for (var i = 0; i < myMovies.length; i++) {

        $('<button>').addClass("btn jsonInfo")
            .html(myMovies[i]).appendTo(".buttonsHere")
    }
}

$(".searchButton").on("click", function () {
    event.preventDefault();

    var userInput = $(".gifInput").val();

    myMovies.push(userInput);
    $(".gifInput").val("");

    makeButtons();
    myMovies2();
})
makeButtons();


function myMovies2() {
    $(".jsonInfo").on("click", function () {
        $(".gifsHere").empty();
        var newMovie = $(this).html();
        var movieUrl = "http://api.giphy.com/v1/gifs/search?q=" + newMovie + "&api_key=dc75eaa47ff2402cb92349f140f9aab2&limit=10"

        $.ajax({
            url: movieUrl,
            method: "GET"
        }).done(function (result) {

            var jsonGif = result
            console.log(jsonGif);
            for (var i = 0; i < result.data.length; i++) {

                var newImg = $("<img>")
                newImg.addClass("col btn gifAnimate")
                newImg.attr("src", result.data[i].images.fixed_height_still.url)
                newImg.attr("data-status", "still")
                newImg.attr("data-animate", result.data[i].images.fixed_height.url)
                newImg.attr("data-still", result.data[i].images.fixed_height_still.url).on("click", function () {

                    console.log($(this).data());
                    if ($(this).data("status") === "still") {
                        console.log("hello");
                        $(this).data("status", "moving")
                        $(this).attr("src", $(this).data("animate"))
                    } else {
                        console.log('moving');
                        $(this).data("status", "still")
                        $(this).attr("src", $(this).data("still"))
                    }
                })


                newImg.appendTo(".gifsHere")
            }
        })

    })
}
myMovies2();