var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Vehiculos', function($scope, $http) {
    $scope._id = null;
    $scope.nombre = '';
    $scope.precio = ''
    $scope.modelo = '';
    $scope.marca = '';
    $scope.fechaalquiler = '';
    $scope.telefono = '';
    $scope.dui = '';
    $scope.cantidad = '';
    $scope.fechadevolucion = '';
    $scope.vehiculos = [];
    $scope.cargarVehiculos = function(){
        $http({
            method: 'GET', url: '/listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.vehiculos = data;
            }else{
                alert('Error al intentar recuperar los vehiculos.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los vehiculos.');
        });
    };
    $scope.guardarVehiculo = function() {
        $http({
            method: 'POST',
            url: '/guardar',
            params: {
                nombre: $scope.nombre,
                precio: $scope.precio,
                modelo: $scope.modelo,
                marca: $scope.marca,
                fechaalquiler: $scope.fechaalquiler,
                telefono: $scope.telefono,
                dui: $scope.dui,
                cantidad: $scope.cantidad,
                fechadevolucion: $scope.fechadevolucion,
                _id: $scope._id
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.limpiarDatos();
                $scope.cargarVehiculos();    
            }else{
                alert('Error al intentar guardar el Vehiculo.');
            }
        }).
        error(function() {
            alert('Error al intentar guardar el Vehiculo.');
        });
    }
    $scope.recuperarVehiculo = function(indice) {
        $http({
            method: 'GET',
            url: '/recuperar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope._id = data._id;
                $scope.nombre = data.nombre;
                $scope.precio = data.precio;
                $scope.modelo = data.modelo;
                $scope.marca = data.marca;
                $scope.fechaalquiler = data.fechaalquiler;
                $scope.telefono = data.telefono;
                $scope.dui = data.dui;
                $scope.cantidad = data.cantidad;
                $scope.fechadevolucion = data.fechadevolucion;
            }else{
                alert('Error al intentar recuperar el Vehiculo.');
            }            
        }).
        error(function() {
            alert('Error al intentar recuperar el Vehiculo.');
        });
    };
    $scope.eliminarVehiculo = function(indice) {
        $http({
            method: 'POST',
            url: '/eliminar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(data == 'Ok'){
                $scope.limpiarDatos();
                $scope.cargarVehiculos();
            }else{
                alert('Error al intentar eliminar el Vehiculo.');
            }            
        }).
        error(function() {
            alert('Error al intentar eliminar el Vehiculo.');
        });
    };
    $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.nombre = '';
        $scope.precio = '';
        $scope.modelo = '';
        $scope.marca = '';
        $scope.fechaalquiler = '';
        $scope.telefono = '';
        $scope.dui = '';
        $scope.cantidad = '';
        $scope.fechadevolucion = '';
    };
});