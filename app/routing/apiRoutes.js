
const friendsData = require("../data/friends")

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.send(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        friendsData.push(req.body);
        console.log(req.body + "added");
        res.send(req.body + "added to friends");
    });


}