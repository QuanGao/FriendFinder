 
    $(document).ready(function () {

        $("#submitSurvy").on("click", function (event) {

            event.preventDefault();

            let isComplete = true;

            function sumAbs(arr1, arr2) {
                let sum = 0;
                for (let i = 0; i < arr1.length; i++) {
                    sum += Math.abs(+arr1[i] - +arr2[i]);
                };
                return sum;
            }

            $("input").each(function () {
                if (!$(this).val()) {
                    isComplete = false;
                } 
            });

            let user = {
                name: $("#inputName").val().trim(),
                photos: $("#inputPhoto").val().trim(),
                uniqid: Date.now()
            };

            user.scores = [];
            $("select").each(function () {
                let score = $(this).val();
                if (!score) {
                    isComplete = false;
                } else {
                    user.scores.push(score)
                }
            })

            if (!isComplete) {
                alert("Please fill out all questions!");
            } else {
                $.get("/api/friends", function (data) {
                    let bff = data.reduce((a, b) => {
                        return sumAbs(a.scores, user.scores) < sumAbs(b.scores, user.scores) ? a : b;                          
                    })

                    $(".bestMatch-name").text(bff.name);
                    $(".bestMatch-img").html(`<img src=${bff.photos}></img>`)

                    $.post("/api/friends", user, function (data) {
                        if (data) {
                            $("#result").modal("show");
                        } 
                    });

                })
            }

        })

    })