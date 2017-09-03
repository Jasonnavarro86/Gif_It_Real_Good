var giphyMagic = {

    myMovies: ["aladdin", "lion king", "mulan", "beauty and the beast", "moana", "toy story", "the jungle book"],
    makeButtons: function () {
        $(".buttonsHere").empty();
        for (var i = 0; i < this.myMovies.length; i++) {
            $('<button>').addClass("btn jsonInfo")
                .html(this.myMovies[i]).appendTo(".buttonsHere")
        }
    },
    pushIntoArray: function () {
        $(".searchButton").on("click", function () {
            event.preventDefault();
            var userInput = $(".gifInput").val();
            giphyMagic.myMovies.push(userInput)
            $(".gifInput").val("");
            giphyMagic.makeButtons();
            giphyMagic.myMovies2();
        })
    },
    myMovies2: function () {
        $(".jsonInfo").on("click", function () {
            $(".gifsHere").empty();
            var newMovie = $(this).html();
            var movieUrl = "https://api.giphy.com/v1/gifs/search?q=" + newMovie + "&api_key=dc75eaa47ff2402cb92349f140f9aab2&limit=10";
            $.ajax({
                url: movieUrl,
                method: "GET"
            }).done(function (result) {

                var jsonGif = result
                for (var i = 0; i < result.data.length; i++) {

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
                    newImg.appendTo(".gifsHere");
                }
            })
        })
    },
}
giphyMagic.pushIntoArray();
giphyMagic.makeButtons();
giphyMagic.myMovies2();