// Cria um módulo (blogApp) (sem dependencias)
angular.module('blogApp', [])

// controller (BlogCtrl) listagem de postagens
.controller('BlogCtrl', function($scope, $http) {
  $scope.carregando = true;
  $scope.erro = false;

  //requisição GET para postagens
  $http.get('https://api-fake-blog.onrender.com/postagens/')
    .then(function(response) {
      //armazena os dados da resposta na variável 'posts'
      $scope.posts = response.data;
      //carregamento terminou
      $scope.carregando = false;
    }, function() {
      //Caso de erro requisição:
      $scope.erro = true;
      //carregamento terminou
      $scope.carregando = false;
    });
})

// controller (PostCtrl) postagem específica
.controller('PostCtrl', function($scope, $http, $location) {
  //mesmo sistema de cima
  $scope.carregando = true;
  $scope.erro = false;

  //Para obter o id da API
  function getIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    //valor do parâmetro 'id'
    return params.get('id');
  }

  //id da API
  var id = getIdFromUrl();

  //id existe e é um número?
  if (id !== null && !isNaN(Number(id))) {
    // GET para obter o id de x postagem
    $http.get('https://api-fake-blog.onrender.com/postagem/' + id)
      .then(function(response) {
        //mesmo sistema la de cima
        $scope.post = response.data;
        $scope.carregando = false;
      }, function() {
        $scope.erro = true;
        $scope.carregando = false;
      });
  } else {
    // id inválido = erro
    $scope.erro = true;
    $scope.carregando = false;
  }
});