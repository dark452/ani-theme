"use strict";

angular.module("redeshost",["ui.router","ngAnimate","textAngular","ngLoadingSpinner","ui.bootstrap","bootstrap.fileField"]).config(["$stateProvider",
	"$urlRouterProvider",

	function(r,t){
		t.when("/dashboard","/dashboard/products"),
		t.otherwise("/login"),
		r.state("base",{"abstract":!0,url:"",
				templateUrl:"views/base.html"}).
		state("login",
				{url:"/login",parent:"base",
				templateUrl:"views/login.html",
				controller:"LoginCtrl"}).
		state("dashboard",
				{url:"/dashboard",parent:"base",
				templateUrl:"views/dashboard.html",
				controller:"DashboardCtrl"}).
		state("products",
				{url:"/products",parent:"dashboard",
				templateUrl:"views/dashboard/overview.html"}).
		state("services",
				{url:"/services",parent:"dashboard",
				templateUrl:"views/dashboard/servicios.html"}).
		state("ventas",
				{url:"/ventas",parent:"dashboard",
				templateUrl:"views/dashboard/ventas.html"}).
		state("clientes",
				{url:"/clientes",parent:"dashboard",
				templateUrl:"views/dashboard/clientes.html"}).
		state("reports",
				{url:"/reports",parent:"dashboard",
				templateUrl:"views/dashboard/reports.html"})}]),

angular.module("redeshost").filter('startFrom', function() {
     return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
}),

angular.module("redeshost").controller("LoginCtrl",
	["$scope","$location",
	function(r,t){
		r.submit=function(){
			return t.path("/dashboard"),!1}}]),
angular.module("redeshost").controller("DashboardCtrl",
	["$scope","$state",

	function(r,t){
		r.$state=t}]),

angular.module(['redeshost']).controller('products',
	function($scope,$http,$timeout,$modal){

	

    startAjax();

    	 function startAjax() {
    	   //$http.get('http://localhost:8000/products/',{username:'dark452',password:'pamelarivera1953'},{withCredentials: true}).success(function(data){
        $http.get('http://192.168.0.17:8000/products/?format=json', {
        headers: {'Authorization': 'Basic ZGFyazQ1MjpwYW1lbGFyaXZlcmExOTUz'}}).success(function(data){
        $scope.list = data.results;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter  
        $scope.totalItems = $scope.list.length;
  	})};

  	$scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };


    $scope.edit_product=function(data) {   
      data.tipo = "edit"; 	
      var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'producto_detalles.html',
      controller: 'ProductsModalInstanceCtrl', 
      size: 'lg',       
      resolve: {
        item: function () {
          return data;
        }
      }
    
    })
    modalInstance.result.then(function () {
       // alert($scope.textbox.product_name);
       //$scope.product_name = product_name;
      // console.log(product_name);
      // console.log(data.product_name);
        //
    });

    

    };
$scope.new_product=function(){
      $scope.tipo = "new";
      $scope.resolve = false;
      $scope.data = {product_name : "",
        description_product : "",
        date_creation : "",
        product_price_clp : "",
        product_price_usd : "",
        campo1 : "",
        campo2 : "",
        campo3 : "",
        campo4 : "",
        campo5 : "",
        campo6 : "",
        campo7 : "",
        campo8 : "",             
        logo : ""};
      var modalInstanceNew = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'agregar_producto.html',
        controller: 'ProductsModalInstanceCtrl',  
        size: 'lg',   
      resolve: {
        item: function () {
          return $scope;
        }
      }
    
    })
    modalInstanceNew.result.then(function () {
      $scope.resolve=true;
       // alert($scope.textbox.product_name);
       console.log('haré el startAjax');
      startAjax();
      // console.log(item.product_name);
     //  console.log(logo);
        
    });
      
    };


  }),

	angular.module('redeshost').controller('ProductsModalInstanceCtrl', function ($scope, $modalInstance,$http, item) {
		$scope.data=item;

   // console.log($scope.data);
   console.log("estoy aqui -->"+$scope.data.tipo);
  
   

       
      if($scope.data.tipo=='new'){

        $scope.ok = function () {
                     //create form data object
            var fd = new FormData();
            fd.append('tmp_name',$scope.data.title);
            fd.append('file', $scope.data.uploadFile);
            //send the file / data to your server
            $http.post('../dist/api/upload.php', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
              });
        
        

                 $scope.data.date_creation = new Date();
            var dataObj = {
                "product_name" : $scope.data.product_name,
                "description_product" : $scope.data.description_product,
                "product_price_clp" : $scope.data.product_price_clp,
                "product_price_usd" : $scope.data.product_price_usd,
                "campo1" : $scope.data.campo1,
                "campo2" : $scope.data.campo2,
                "campo3" : $scope.data.campo3,
                "campo4" : $scope.data.campo4,
                "campo5" : $scope.data.campo5,
                "campo6" : $scope.data.campo6,
                "campo7" : $scope.data.campo7,
                "campo8" : 'djando',            
                "date_creation" : $scope.data.date_creation,
                "logo" : $scope.data.logo.name
            };

            $http.post('http://192.168.0.17:8000/products/',dataObj, {
                headers: {'Authorization': 'Basic ZGFyazQ1MjpwYW1lbGFyaXZlcmExOTUz'}}).success(function(data){
              
            });
            alert("Se ingreso correctamente");
            $modalInstance.close($scope.selected);
          };
        }else{
          
          $scope.ok = function () {
                     //create form data object
              
            var dataObj = {
                "product_name" : $scope.data.product_name,
                "description_product" : $scope.data.description_product,
                "product_price_clp" : $scope.data.product_price_clp,
                "product_price_usd" : $scope.data.product_price_usd,
                "campo1" : $scope.data.campo1,
                "campo2" : $scope.data.campo2,
                "campo3" : $scope.data.campo3,
                "campo4" : $scope.data.campo4,
                "campo5" : $scope.data.campo5,
                "campo6" : $scope.data.campo6,
                "campo7" : $scope.data.campo7,
                "campo8" : 'djando',            
                "date_creation" : $scope.data.date_creation,
                "logo" : $scope.data.logo
            };

            $http.put('http://192.168.0.17:8000/products/'+$scope.data.id+'/',dataObj, {
                headers: {'Authorization': 'Basic ZGFyazQ1MjpwYW1lbGFyaXZlcmExOTUz'}}).success(function(data){
              
            });
            alert("Se ingreso correctamente");
            $modalInstance.close($scope.selected);
          };
        }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}),


angular.module(['redeshost']).controller('services',
  function($scope,$http,$timeout,$modal){

  

    startAjax();

       function startAjax() {
         //$http.get('http://localhost:8000/products/',{username:'dark452',password:'pamelarivera1953'},{withCredentials: true}).success(function(data){
        $http.get('http://192.168.0.17:8000/services/?format=json', {
        headers: {'Authorization': 'Basic ZGFyazQ1MjpwYW1lbGFyaXZlcmExOTUz'}}).success(function(data){
        $scope.list = data.results;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter  
        $scope.totalItems = $scope.list.length;
    })};

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };


    $scope.edit_service=function(data) {    
      data.tipo = "edit";
      var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'servicio_detalles.html',
      controller: 'ServicioModalInstanceCtrl', 
      size: 'lg',       
      resolve: {
        item: function () {
          return data;
        }
      }
    
    })
    modalInstance.result.then(function () {
       // alert($scope.textbox.product_name);
       //$scope.product_name = product_name;
      // console.log(product_name);
      // console.log(data.product_name);
        
    });

    

    };
$scope.new_service=function(){
      //scope.tipo = "new";

      $scope.resolve = false;
      $scope.data = {service_name : "",
        service_description : "",
        date_creation : "",
        tipo : "new"
       };
      var modalInstanceNew = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'agregar_servicio.html',
        controller: 'ServicioModalInstanceCtrl',  
        size: 'lg',   
      resolve: {
        item: function () {
          return $scope.data;
        }
      }
    
    })
    modalInstanceNew.result.then(function () {
    //  $scope.resolve=true;
       // alert($scope.textbox.product_name);
      startAjax();
      // console.log(item.product_name);
     //  console.log(logo);
        
    });
      
    };


  }),

  angular.module('redeshost').controller('ServicioModalInstanceCtrl', function ($scope, $modalInstance,$http, item) {
  $scope.data=item;

   console.log($scope);
    // console.log("estoy aqui -->"+$scope.data.tipo);

  
   

       
      if($scope.data.tipo=='new'){

        $scope.ok = function () {
        $scope.data.creation_date = new Date();
        var dataObj = {
            "service_name" : $scope.data.service_name,
            "service_description" : $scope.data.service_description,
            "creation_date" : $scope.data.creation_date       
        };

        $http.post('http://192.168.0.17:8000/services/',dataObj, {
            headers: {'Authorization': 'Basic ZGFyazQ1MjpwYW1lbGFyaXZlcmExOTUz'}}).success(function(data){
          
        });
        alert("Se ingreso correctamente");
        $modalInstance.close($scope.selected);
        };
    }else{
      $scope.ok = function () {
          var dataObj = {
            "service_name" : $scope.data.service_name,
            "service_description" : $scope.data.service_description,
            "creation_date" : $scope.data.creation_date
          };

         $http.put('http://192.168.0.17:8000/services/'+$scope.data.id+'/',dataObj, {
                headers: {'Authorization': 'Basic ZGFyazQ1MjpwYW1lbGFyaXZlcmExOTUz'}}).success(function(data){
              
            });
            alert("Se edito correctamente!");
            $modalInstance.close($scope.selected);
          
        };
  }
    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}),

 angular.module(['redeshost']).controller('wysiwygeditor', function wysiwygeditor($scope) {
          //$scope.htmlContentxx = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
      });
