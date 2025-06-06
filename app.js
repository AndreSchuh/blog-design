angular.module('blogApp', [])

.controller('BlogCtrl', function($scope, $http) {
  $scope.carregando = true;
  $scope.erro = false;

  $http.get('https://api-fake-blog.onrender.com/postagens/')
    .then(function(response) {
      $scope.posts = response.data;
      $scope.carregando = false;
    }, function() {
      $scope.erro = true;
      $scope.carregando = false;
    });
})

.controller('PostCtrl', function($scope, $http, $location) {
  $scope.carregando = true;
  $scope.erro = false;

  function getIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  var id = getIdFromUrl();

  if (id !== null && !isNaN(Number(id))) {
    $http.get('https://api-fake-blog.onrender.com/postagem/' + id)
      .then(function(response) {
        $scope.post = response.data;
        $scope.carregando = false;
      }, function() {
        $scope.erro = true;
        $scope.carregando = false;
      });
  } else {
    $scope.erro = true;
    $scope.carregando = false;
  }
});