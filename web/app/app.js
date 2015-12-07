// Toteuta moduulisi tänne
var MovieBase = angular.module('MovieBase', ['firebase']);

MovieBase.service('FirebaseService', function($firebaseArray){
  
    var firebaseRef = new Firebase('https://popping-torch-6063.firebaseio.com/movies');
    var movies = $firebaseArray(firebaseRef);

    this.getMovies = function(){
        return movies;
    }
    
    this.addMovies = function(movie){
        movies.$add(data);
    }
});

MovieBase.Controller('MovieBaseGetController', function($scope, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
    
    
});

MovieBase.Controller('MovieBaseAddController', function($scope, FirebaseService) {
    $scope.addMovies = function () {
            FirebaseService.addMovies({
                name: $scope.newName,
                director: $scope.newDirector,
                release: $scope.newRelease,
                description: $scope.newDescription
            });
        
    }
    
    
});