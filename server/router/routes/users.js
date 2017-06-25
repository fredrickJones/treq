var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    users: [
      { ID: 1, email: 'test.a@angular.com' },
      { ID: 2, email: 'test.b@grunt.com' },
      { ID: 3, email: 'test.b@express.com' }
    ]
  });
});

module.exports = router;
