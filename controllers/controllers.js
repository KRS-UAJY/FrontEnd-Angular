'use strict';
angular.module('scotchApp')
    // create the controller and inject Angular's $scope
    .controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    })

.controller('TablesController', function($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.message = 'Look! I am an about page.';
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('data.json')
        .withDOM('frtip')
        .withPaginationType('full_numbers')
        // Active Buttons extension
        .withButtons([
            'columnsToggle',
            'colvis',
            'copy',
            'print',
            'excel',
            'pdf',
            {
                text: 'Some button',
                key: '1',
                action: function(e, dt, node, config) {
                    alert('Button activated');
                }
            }
        ]);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('no').withTitle('No.'),
        DTColumnBuilder.newColumn('matakuliah').withTitle('Mata Kuliah'),
        DTColumnBuilder.newColumn('kelas-dosen').withTitle('Kelas-Dosen'),
        DTColumnBuilder.newColumn('sks').withTitle('SKS'),
        DTColumnBuilder.newColumn('kuota').withTitle('Kuota')
    ];

});

// .controller('contactController', function($scope) {
// 	$scope.message = 'Contact us! JK. This is just a demo.';
// })