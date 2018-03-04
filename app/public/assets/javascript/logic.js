 $(document).ready(function () {

     $("#submitSurvy").on("click", function (event) {
         event.preventDefault();

         function sumAbs(arr1, arr2) {
             let sum = 0;
             for (let i = 0; i < arr1.length; i++) {
                 sum += Math.abs(+arr1[i] - +arr2[i]);
             };
             return sum;
         }

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
         } else {
             alert("Please fill out all questions!");
         }

     })

 })