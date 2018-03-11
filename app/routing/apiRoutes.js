
const friendsData = require("../data/friends");

function sumAbs(arr1, arr2) {
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += Math.abs(+arr1[i] - +arr2[i]);
    };
    return sum;
}

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.send(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        let bff = friendsData.reduce((a, b) => {
            return sumAbs(a.scores, req.body.scores) < sumAbs(b.scores, req.body.scores) ? a : b;
        });

        friendsData.push(req.body);
        
        res.json(bff);
    });
}