 $(document).ready(function () {

     $("#submitSurvy").on("click", function (event) {
        event.preventDefault();

        let inputData = $("form").serializeArray().filter(a => {
            return a.value.trim() !== ""
        })

        if (inputData.length === 12) {

            let user = {
                uniqid: Date.now(),
                name: inputData[0].value,
                photos: inputData[1].value,
                scores: inputData.slice(2).map(a => {
                    return a.value
                })
            };

            $.post("/api/friends", user, function (data) {
                if (data) {
                    $(".bestMatch-name").text(data.name);
                    $(".bestMatch-img").html(`<img src=${data.photos}></img>`)
                    $("#result").modal("show");
                }
            });
            
        } else {
            alert("Please fill out all questions!");
        }

    })

})