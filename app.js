angular.module('blog', []);

// Controller da lista de postagens
angular.module('blog').controller('Rest', function ($scope, $http){
  $http.get('https://api-fake-blog.onrender.com/postagens')
    .success(function(data) {
      $scope.publicacoes = data;
    });
});

// Controller da postagem individual
angular.module('blog').controller('PostagemCtrl', function ($scope, $http, $window){
  // Função para extrair o parâmetro da URL
  function getIdFromUrl() {
    const params = new URLSearchParams($window.location.search);
    return params.get('id');
  }

  const id = getIdFromUrl();
  if (id) {
    $http.get('https://api-fake-blog.onrender.com/postagem/' + id)
      .success(function(data) {
        $scope.postagem = data;
      })
      .error(function() {
        $scope.postagem = { title: 'Erro', description: 'Não foi possível carregar a postagem.' };
      });
  }
});
