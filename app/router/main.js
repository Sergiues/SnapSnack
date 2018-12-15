var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    response.render('index.html');
});
router.get('/menu', function(request, response) {
    response.render('menu.html');
});
router.get('/item', function(request, response) {
    response.render('item.html');
});
router.get('/basket', function(request, response) {
    response.render('basket.html');
});
router.get('/register', function(request, response) {
    response.render('register.html');
});
router.get('/admin', function(request, response) {
    response.render('admin.html');
});
router.get('/user', function(request, response) {
    response.render('user.html');
});
module.exports = router;