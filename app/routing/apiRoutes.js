
const friendsData = require("../data/friends")

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.send(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        friendsData.push(req.body);
        res.json(true);
    });
}