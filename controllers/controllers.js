'use strict';
angular.module('scotchApp')
    // create the controller and inject Angular's $scope
    .controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
        var self = this;
        self.Login = Login;
        

        function Login() {
            console.log('Login');
        }
    })

.controller('TablesController', function($compile, $scope,$localStorage, DTOptionsBuilder, DTColumnBuilder) {
    $scope.message = 'Look! I am an about page.';
    console.log($localStorage.currentUser.username);
    setdatamhs ();
    var foto;
    var vm = this;
    var table = $('#tabel').DataTable();
    let hubUrl = 'http://127.0.0.1:34561/kapasitas';
    let httpConnection = new signalR.HttpConnection(hubUrl);
    let hubConnection = new signalR.HubConnection(httpConnection);
    hubConnection.start();
    vm.selected = {};
    vm.selectAll = false;
    vm.toggleOne = toggleOne;
    vm.dtOptions = DTOptionsBuilder
    .newOptions()
    .withOption('ajax', {
        headers: {
            Authorization: 'Bearer ' + $localStorage.currentUser.token
            },
        dataSrc: '',
        url: 'http://127.0.0.1:34563/api/kelas/'+$localStorage.currentUser.prodi,
        type: 'GET',
        error: function () {
            // remove the token from localStorage and redirect to the auth state
        }
    })
      .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        })
        .withOption('headerCallback', function(header) {
            if (!vm.headerCompiled) {
                // Use this headerCompiled field to only compile header once
                vm.headerCompiled = false;
                $compile(angular.element(header).contents())($scope);
            }
        })
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
        
        DTColumnBuilder.newColumn('kelas.id_kelas').withTitle('Pilih').notSortable()
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id] = false;
                return '<label class="switch"><input id="P'+data+'" type="checkbox" ng-model="tables.selected[' + data + ']" ng-click="tables.toggleOne(' + data + ')"><span class="slider round"></span></label>';
            }),
        DTColumnBuilder.newColumn('kelas.kode_mk').withTitle('KODE'),
        DTColumnBuilder.newColumn('kelas.nama_mk').withTitle('Mata Kuliah'),
        DTColumnBuilder.newColumn('kelas.kelas').withTitle('Kelas'),
        DTColumnBuilder.newColumn('kelas.dosen1.nama_dosen').withTitle('Dosen'),
        DTColumnBuilder.newColumn('kelas.sks').withTitle('SKS'),
        DTColumnBuilder.newColumn('kelas.matakuliah.semester').withTitle('Semester'),
        DTColumnBuilder.newColumn('kelas').withTitle('Kuota')
        .renderWith(function(kelas, type, full, meta) {
            return '<label id="'+kelas.id_kelas+'">'+kelas.kapasitas_kelas+'</label>';
        })
    ];
    hubConnection.on('UpdateKelas', data => {
        console.log(data);
        var Kuota=parseInt(document.getElementById(data.id_kelas).innerHTML);
        if(data.val==true)
        {
            document.getElementById(data.id_kelas).innerHTML = Kuota-1;
        }
        else
        {
            document.getElementById(data.id_kelas).innerHTML = Kuota+1;
        }
        
      
    });
    function toggleOne (selectedItems) {
        console.log(selectedItems);
        if(document.getElementById('P'+selectedItems).checked){
            console.log('checked');

            var krs = {
                npm: selectedItems,
                id_kelas: $localStorage.currentUser.username
              };
              let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Authorization" : "Bearer "+$localStorage.currentUser.token,
                    "Access-Control-Allow-Origin": "*",
                }
              };
             axios.post('http://127.0.0.1:34564/api/ambilkrs', krs, axiosConfig)  
             .then((result) => {
             console.log("RESPONSE RECEIVED: ", result);
             hubConnection.invoke('UpdateKapasitas',selectedItems,true);
             })
             .catch((result) => {
             console.log("AXIOS ERROR: ", result);
             });
            
        }
        else
        {
            console.log('Unchecked');
              var krs = {
                npm: selectedItems,
                id_kelas: $localStorage.currentUser.username
              };
              let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Authorization" : "Bearer "+$localStorage.currentUser.token,
                    "Access-Control-Allow-Origin": "*",
                }
              };
             axios.post('http://127.0.0.1:34564/api/batalkrs', krs, axiosConfig)  
             .then((result) => {
             console.log("RESPONSE RECEIVED: ", result);
             hubConnection.invoke('UpdateKapasitas',selectedItems,false);
             })
             .catch((result) => {
             console.log("AXIOS ERROR: ", result);
             });
        }
        
    }
    function setdatamhs () {

        axios.get(
            'http://127.0.0.1:34562/api/Mahasiswa/data/'+$localStorage.currentUser.username,
            {headers: {
                "Authorization" : "Bearer "+$localStorage.currentUser.token,
                "Access-Control-Allow-Origin": "*",
              }
            }
          )
          .then((response) => {
            console.log(response);
            document.getElementById("nama").innerHTML = response.data.indukmhs.namamhs;
            document.getElementById("npm").innerHTML = response.data.npm;
            document.getElementById("fakultas").innerHTML = response.data.fakultas.fakultas;
            document.getElementById("prodi").innerHTML = response.data.prodi.prodi;
            foto=response.data.fotomhs.foto;
            $("#foto").attr("src","data:image/jpeg;base64,"+foto);
            console.log(foto);
            },
            (error) => {
                console.log(error);
            }
          );
    }
    
    
        
    

});

// .controller('contactController', function($scope) {
// 	$scope.message = 'Contact us! JK. This is just a demo.';
// })