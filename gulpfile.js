var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rubySass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),

    jsmin = require('gulp-uglify'),

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    htmlmin = require('gulp-htmlmin'),

    concat = require('gulp-concat'), // 合并文件
    rename = require('gulp-rename'), //重命名文件
    connect = require('gulp-connect'),

    gulpif = require('gulp-if'),

    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    handleErrors = require('./gulp/handleErrors');

    var env = process.env.NODE_ENV || 'development';
    var outputDir = 'dist/development';

    var config = {};

    if (env === "development") {
        config.map = 'sourcemaps.write()';
        config.outputStyle= '';
        config.outputdir = 'dist/development';
    }

    else if (env === "production") {
        config.map = '';
        config.outputStyle = '{outputStyle: "compressed"}';
        config.outputdir = 'dis/production';
    }


    gulp.task('htmlmin', function() {
        return gulp.src('src/templates/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(rename( function( path ) {
                path.basename += '.min';
            }))
            .pipe(gulp.dest(config.outputdir+'/htmlmin'))
            .pipe(connect.reload());
    })

    gulp.task('html', function() {
        return gulp.src('src/templates/*.html')
            .pipe(gulp.dest(config.outputdir+'/html'))
            .pipe(connect.reload());
    })

    gulp.task('js', function() {
        return gulp.src('src/js/*.js')
            .pipe(plumber( { errorHandler: handleErrors() }))
            .pipe(gulp.dest(config.outputdir+'/js'))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe (jsmin())
            .pipe(sourcemaps.write('./'))
            .pipe(rename( function( path ) {
                path.basename += '.min';
            }))
            .pipe(gulp.dest(config.outputdir+'/js'))
            .pipe(connect.reload());
    });

    gulp.task('sass', function() {
        return gulp.src('src/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass(config.outputStyle).on("error", sass.logError))
            .pipe(autoprefixer())
            .pipe(config.map)
            .pipe(rename( function( path ) {
                path.basename += '.min';
            }))
            .pipe(gulp.dest(config.outputdir+ '/css'))
            .pipe(connect.reload());
     });

     gulp.task('css', function() {
        return gulp.src('src/css/*.css')
            .pipe(autoprefixer())
            .pipe(gulp.dest( config.outputdir + '/css'))
            .pipe(connect.reload());
     })

     gulp.task('rubySass', function() {
        var rboutputStyle = '',
            rbname = '';
        if (env === "development") {
            rboutputStyle = '';
            rbrename = "";
        }

        else if (env === "production") {
            rboutputStyle = 'compressed';
            rbrename = ".min";
        }

        return rubySass('src/sass/*.scss', { sourcemap: true ,compass: true, style: rboutputStyle})
            .on('error', rubySass.logError)
            .pipe(sourcemaps.write())

            .pipe(sourcemaps.write('maps', {
                includeContent: false,
                sourceRoot: 'source'
            }))
            .pipe(rename( function( path ) {
                path.basename += rbname
            }))
            .pipe(gulp.dest(config.outputdir+ '/css'))
            .pipe(connect.reload());

     })

//    gulp.task('autoprefixer',function() {
//        return gulp.src('src/css/*.css')
 //           .pipe(autoprefixer())
 //           .pipe(gulp.dest('dist/development/css'));
 //   });

    gulp.task('image',function() {
        return gulp.src('src/images/*.{png,jpg,gif,ico}')
            .pipe(imagemin({
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                svgoPlugins: [{removeViewBox: false}], //不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            }))
            .pipe(gulp.dest(config.outputdir+'/images'))
            .pipe(connect.reload());
    });

//  只压缩修改的图片,没有修改的图片直接从缓存文件读取
// .pipe(cache(imagemin({
//      progressive: true,
//      svgoPlugins: [{removeViewBox: false}],
//      use: [pngquant()]
//     })))
//

    gulp.task('watch', function() {
        gulp.watch('src/templates/*.html', ['html']);
        gulp.watch('src/js/*.js', ['js']);
        gulp.watch('src/sass/*.scss', ['rubySass']);
        // gulp.watch('src/css/*.css', ['css']);
    });

    gulp.task('connect', function() {
        connect.server({
            root: [outputDir],
            port: 8080,
            livereload: true
        });
    });
   // image 在 sass 的后面
    gulp.task('default', ['htmlmin', 'html', 'js', 'rubySass', 'watch', 'connect']);
    //gulp.task('default', ['html', 'js', 'css', 'watch', 'connect']);

