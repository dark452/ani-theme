"use strict";

angular.module("redeshost",["ui.router","ngAnimate","textAngular","ngLoadingSpinner","ui.bootstrap"]).config(["$stateProvider",
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
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
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
    	$http.get('api/queries.php').success(function(data){
        $scope.list = data;
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
      var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'producto_detalles.html',
      controller: 'ModalInstanceCtrl',     
      resolve: {
        item: function () {
          return data;
        }
      }
    
    })};

  }),

	angular.module('redeshost').controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {
		$scope.data=item;
  $scope.ok = function () {
    $modalInstance.close($scope.selected);
    alert("Me cerre");
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}),

 angular.module(['redeshost']).controller('wysiwygeditor', function wysiwygeditor($scope) {
          $scope.htmlContentxx = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
      });