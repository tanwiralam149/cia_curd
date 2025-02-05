app.service('ApiService', function($http) {
    this.getUsers = function() {
        return $http.get('http://your-ci3-domain/api/get_users');
    };

    this.addUser = function(userData) {
        return $http.post('http://your-ci3-domain/api/add_user', userData);
    };
});