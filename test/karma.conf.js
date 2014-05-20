module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'public/vendor/danialfarid-angular-file-upload/dist/angular-file-upload-shim.min.js',
      'public/vendor/angular/angular.js',
      'public/vendor/angular-mocks/angular-mocks.js',
      'public/vendor/angular-resource/angular-resource.js',
      'public/vendor/angular-ui-bootstrap-bower/ui-bootstrap.js',
      'public/vendor/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      'public/vendor/angular-ui-router/release/angular-ui-router.js',
      'public/vendor/angular-ui-tree/dist/angular-ui-tree.js',
      'public/vendor/danialfarid-angular-file-upload/dist/angular-file-upload.min.js',

      'public/vendor/jquery/dist/jquery.js',
      'public/vendor/ng-grid/build/ng-grid.js',
      'public/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['mocha', 'chai'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
