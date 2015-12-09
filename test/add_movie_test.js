describe('Add movie', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MovieBase');

        FirebaseServiceMock = (function () {
            
            var movies = [
                {
                    name: "trolli",
                    director: "röli",
                    release: "2001",
                    description: "röllimies"
                },
                {
                    name: "trolli2",
                    director: "röli2",
                    release: "2001",
                    description: "röllimies2"
                },
                {
                    name: "trolli3",
                    director: "röli3",
                    release: "2001",
                    description: "röllimies3"
                }
            ];

            return {
                // Toteuta FirebaseServicen mockatut metodit tähän
                addMovies: function (movie) {
                    movies.push(movie);
                }
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovies').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MovieBaseAddController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {

        var newMovie = {
            name: "trolli4",
            director: "röli4",
            release: "2001",
            description: "röllimies4"
        };
        scope.addMovies(newMovie);
        expect(scope.movies.length).toBe(4);
        expect(FirebaseServiceMock.addMovies).toHaveBeenCalled();

    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        expect(true).toBe(false);
    });
});