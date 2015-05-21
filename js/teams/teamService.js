var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	this.addNewGame = function(gameObj){
		var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
		if (parseint(gameObj.homeTeamScore) > parseint(gameObj.opponentScore)) {
			gameObj.won = true;
		} else {
			gameObj.won = false;
		} $http({
			method: 'POST',
			url: url,
			data: gameObj});
	} 
	this.getTeamData = function(team){
		var deferred = $q.defer;
		var url = 'https://api.parse.com/1/classes/' + team;
		$http({
			method: "GET",
			url: url
		}) .then(function(data){
			var results = data.data.results;
			var wins = 0;
			var losses = 0;
			for (var i = 0; i < data.length; i++){
				if (results.won){
					wins += 1;
				}else {
					losses += 1;
				}
				results.wins = wins;
				results.losses = losses;
			}
		});

		return deferred.promise;

	}
});