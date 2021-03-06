// Toteuta moduulisi tänne
var MovieBase = angular.module('MovieBase', ['firebase', 'ngRoute']);

MovieBase.service('FirebaseService', function($location, $firebaseArray){
  
    var firebaseRef = new Firebase('https://popping-torch-6063.firebaseio.com/movies');
    var movies = $firebaseArray(firebaseRef);

    this.getMovies = function(){
        return movies;
    }
    
    this.addMovies = function(movie){
        movies.$add(movie);
        $location.path('/movies');
    }
});

MovieBase.config(function($routeProvider) {
   $routeProvider
    .when('/movies', {
      controller: 'MovieBaseGetController',
      templateUrl: 'movies.html'
    })
    .when('/movies/new', {
      controller: 'MovieBaseAddController',
      templateUrl: 'moviesadd.html'
    })
    .otherwise({
      redirectTo: '/movies'
    }); 
});

MovieBase.controller('MovieBaseGetController', function($scope, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
    
});

MovieBase.controller('MovieBaseAddController', function($scope, FirebaseService) {
    $scope.addMovies = function () {
            FirebaseService.addMovies({
                name: $scope.newName,
                director: $scope.newDirector,
                release: $scope.newRelease,
                description: $scope.newDescription
            });
        
    }
});