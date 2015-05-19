angular.module('MainApp', [])

function mainController($scope, $http) {
	$scope.newUsuario = {};
	$scope.usuarios = {};
	$scope.selected = false;


	//GET LISTA
	$http.get('http://localhost:3000/users/').success(function(data) {
		$scope.usuarios = data;
		$scope.bloquear=false;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	//DELETE element
	$scope.borrarUsuari = function(newUsuario) {
		$http.delete('http://localhost:3000/user/' + $scope.newUsuario._id)
			.success(function(data) {
				console.log($scope.newUsuario._id);
				//Borramos los datos añadidos en los imput boxes
				$scope.newUsuario = {};
				$scope.selected = false;
				$scope.usuarios = null;
				$scope.bloquear=false;

				$http.get('http://localhost:3000/users/').success(function(data) {
					$scope.usuarios = data;
				})
					.error(function(data) {
						console.log('Error: ' + data);
					});

			})
			.error(function(data) {
				console.log('Error: ' + data);
				window.alert('Error:' + data);
			});
	};


	//POST LISTA
	$scope.registrarUsuario = function() {
		$http.post('http://localhost:3000/users/', $scope.newUsuario)
		.success(function(data) {
				$scope.newUsuario = {};
				$scope.usuarios.push(data);
				console.log(data);
				$scope.bloquear=false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
			window.alert('Error: ' + data);
		});
	};

	//modificar
	$scope.modificarUsuario = function(newUsuario) {
		$http.put('http://localhost:3000/user/' + $scope.newUsuario._id, $scope.newUsuario)
		.success(function(data) {
				$scope.newUsuario = {}; // Borramos los datos del formulario
				$scope.usuarios = data;
				$scope.selected = false;
				$scope.bloquear=false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
			window.alert('Error:' + data);
		});
	};



	// Función para coger el objeto seleccionado en la tabla
	$scope.selectUsuario = function(usuario) {
		$scope.newUsuario = usuario;
		$scope.selected = true;
		$scope.bloquear=true;
		console.log($scope.newUsuario, $scope.selected);
	};


	function TodoController($scope){
		$scope.filteredTodos=[],
			$scope.currentPage=1,
			$scope.numPerPage=10,
			$scope.maxSize=5;
		$scope.makeTodos = function(){
			$scope.todos=[];
			$http.get('http://localhost:3000/users/').success(function(data) {
				$scope.usuarios = data;
				$scope.bloquear=false;
				console.log(data);
			})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			$scope.makeTodos();
			$scope.numPages= function(){
				return Math.ceil($scope.todos.length / scope.numPerPage);
			};
			$scope.$watch('currentPage + numPerPage', function(){
				var begin= (($scope.currentPage -1)*$scope.numPerPage),
					end=begin +$scope.numPerPage;

				scope.filteredTodos=$scope.todos.slice(begin, end);

			});
		}


	}
}