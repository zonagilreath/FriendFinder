const path = require('path');
const friends = require('../data/friends.js');

function checkCompatibilty(scores1, scores2){
    let sumDif = 0;
    for (let i=0; i < scores1.length; i++){
        sumDif += Math.pow(scores1[i] - scores2[i], 2);
    }
    return sumDif;
}

function findFriend(newUser, existingUsers){
    let currentBestFriend = null;
    let currentBestFriendsScore = 50;
    existingUsers.forEach(existingUser => {
        let friendScore = checkCompatibilty(newUser.scores, existingUser.scores);
        if (friendScore < currentBestFriendsScore){
            currentBestFriend = existingUser;
            currentBestFriendsScore = friendScore;
        }
    });
    return currentBestFriend;
}

module.exports = function(app){
    app.get('/api/friends', function (req, res){
        return res.json(friends);
    });

    app.post('/api/friends', function (req, res){
        const newUser = req.body;
        let bestFriend = findFriend(newUser, friends);
        console.log(bestFriend);
        return res.send(bestFriend);
    });
}