const gulp = require('gulp'),
sass = require('gulp-sass'),
concat = require('gulp-concat'), 
uglify = require('gulp-uglifyjs'),
cssnano = require('gulp-cssnano'), 
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin'), 
pngquant = require('imagemin-pngquant'),
cache = require('gulp-cache'),
autoprefixer = require('gulp-autoprefixer'),
nodemon = require('gulp-nodemon');
gulp.task('sass',()=>{
    return gulp.src('app/public/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/public/css'))
});

gulp.task('start', function () {
    nodemon({
      script: 'server.js'
    , ext: 'js html'
    })
  });

gulp.task('scripts', ()=> {
    return gulp.src([ 
        'app/public/lib/jquery/dist/jquery.min.js', 
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('app/public/js')); 
});
gulp.task('css-lib',['sass'],()=>{
    return gulp.src('app/public/css/main.css') 
    .pipe(cssnano()) 
    .pipe(rename({suffix: '.min'})) 
    .pipe(gulp.dest('app/public/css'));
});

gulp.task('watch', ['start','css-lib', 'scripts'],()=>{
    gulp.watch('app/public/sass/**/*.sass', ['sass']);
});
