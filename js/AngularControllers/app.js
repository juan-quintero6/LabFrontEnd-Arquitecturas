/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global aplicacionMundial, angular, $templateCache, competitorAutenticado */

(function () {
    var aplicacionMundial = angular.module('aplicacionMundial',[]);
    
    aplicacionMundial.directive('toolbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/toolbar.html',
            controller: function () {
                this.tab = 0;

                this.selectTab = function (setTab) {
                    this.tab = setTab;
                };

                this.isSelected = function (tabParam) {
                    return this.tab === tabParam;
                };
            },
            controllerAs: 'toolbar'
        };
    });
    
    aplicacionMundial.directive('competitorInfo', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/competitor-info.html', 
            controller: 'getCompetitors'
        };
    });

    aplicacionMundial.controller("getCompetitors", function($http, $scope) {
    $http.get('http://localhost:8080/competitors/get')
        .success(function(data, status, headers, config) {
         $scope.competitors = data;
        })
        .error(function(data, status, headers, config) {
        // log error
        });
    });
    
    aplicacionMundial.directive('competitorForm', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/competitor-form.html',
        controller: 'competitorCtrl'
      };
    });

    aplicacionMundial.controller("competitorCtrl", function ($http, $scope) {
        $scope.addCompetitor = function () {
            console.log('name');
            $http.post('http://localhost:8080/competitors/add', JSON.stringify($scope.competitor))
                .success(function (data, headers) {
                    $scope.competitor = {};
                    $scope.toolbar.selectTab(2);
                });
        };
    });
    
    aplicacionMundial.directive('ingresoForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/ingreso-form.html', 
            controller: 'ingresoCtrl'
        };
    });
  
    aplicacionMundial.controller('ingresoCtrl', function ($scope, $http, $location) {
        $scope.competitor = {};

        $scope.login = function () {
            // Realizar la solicitud POST al servicio de autenticación
            $http.post('http://localhost:8080/competitors/login', $scope.competitor)
                .then(function (response) {
                    // Éxito en la autenticación
                    var competidorAutenticado = response.data;
                    console.log('Competidor autenticado:', competidorAutenticado);
                    $scope.toolbar.selectTab(4);
                    //$scope.competitorAuth = competitorAutenticado;
                    //$scope.toolbar.disableButton(3);
                                    
                })
                        .catch(function (error) {
                    // Error en la autenticación
                    console.error('Error en la autenticación:', error.data);
                     alert('Credenciales inválidas');
                    // Aquí puedes manejar el error de autenticación según tus necesidades
                });
        };
    });
    
    aplicacionMundial.directive('inicioForm', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/inicio-form.html',
        controller: 'inicioCtrl'
      };
    });
      
})();


