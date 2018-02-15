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
    vm.selected = {};
    vm.selectAll = false;
    vm.toggleOne = toggleOne;

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
        DTColumnBuilder.newColumn(null).withTitle('Pilih').notSortable()
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.no] = false;
                return '<label class="switch"><input type="checkbox" ng-model="tables.selected[' + data.no + ']" ng-click="tables.toggleOne(tables.selected)"><span class="slider round"></span></label>';
            }),
        DTColumnBuilder.newColumn('no').withTitle('No.'),
        DTColumnBuilder.newColumn('matakuliah').withTitle('Mata Kuliah'),
        DTColumnBuilder.newColumn('kelas-dosen').withTitle('Kelas-Dosen'),
        DTColumnBuilder.newColumn('sks').withTitle('SKS'),
        DTColumnBuilder.newColumn('kuota').withTitle('Kuota')
    ];

    
    function toggleOne (selectedItems) {
        for (var no in selectedItems) {
            if (selectedItems.hasOwnProperty(no)) {
                if(!selectedItems[no]) {
                    vm.selectAll = false;
                    return;
                }
            }
        }
        vm.selectAll = true;
    }

});

// .controller('contactController', function($scope) {
// 	$scope.message = 'Contact us! JK. This is just a demo.';
// })