
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');


function task(cb) {
    console.log('gulp start');
    cb();
}
//私有任務

//任務輸出
exports.do = task

//任務 檔案搬家
function move() {
    return src('src/index.html').pipe(dest('dest'))
}


exports.mv = move;


// 
function taskA(cb) {
    console.log('a mission');
    cb();
}


function taskB(cb) {
    console.log('b mission');
    cb();
}

//同步
exports.sync = parallel(taskA, taskB);

// 非同步
exports.async = series(taskA, taskB);

// 壓縮 美化css
const cleanCSS = require('gulp-clean-css');

function minicss() {
    return src('src/css/*.css') //來源檔案
        //    return src(['src/css/*.css' , 'src/a/*.css']) // 多個不同路徑
        .pipe(cleanCSS())//編譯方法
        .pipe(dest('dest/css'))//目的地
}

exports.minCss = minicss;


//壓縮js  改名

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function ugJS() {
    return src('src/js/*.js') //來源
        .pipe(uglify()) //函式
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dest/js'))
}

exports.miniJs = ugJS;


// 改名
// const rename = require('gulp-rename');
// function change(){
//     return src('dest/js/*.js')
//            .pipe(rename({
//             extname: '.min.js'
//            }))
//            .pipe(dest('dest/js/'))

// }

//exports.js = series(ugJS ,change) //先執行壓縮js 再更名min.js
exports.js = ugJS



// html template

const fileinclude = require('gulp-file-include');

function htmltemplate() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dest/'))
}

exports.html = htmltemplate;



// sass 

const sass = require('gulp-sass')(require('sass'));


function styleSass() {
    return src('./src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(dest('./dest/css'));
}

exports.style = styleSass;

// 圖片搬家
function img() {
    return src('src/images/*.*').pipe(dest('dest/images'))
}



function w() {
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass);
    watch(['./src/*.html', './src/layout/*.html'], htmltemplate);
    watch(['./src/js/*.js', './src/js/**/*.js'], ugJS);
    watch(['./src/images/*.*', './src/images/**/*.*'], img);
}
// 先打包在監看變動
exports.dev = series(parallel(htmltemplate, styleSass, ugJS, img), w)

// 多隻css整合
var concat = require('gulp-concat');

function concatcss() {
    return src(['dest/css/*.css', '!dest/css/all.css'])
        .pipe(concat('all.css'))
        .pipe(dest('dest/css/'))
}

exports.allcss = concatcss;



// 瀏覽器同步
const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index: "index.html"
        },
        port: 3000
    });
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass).on('change', reload)
    watch(['./src/*.html', './src/layout/*.html'], htmltemplate).on('change', reload)
    watch(['./src/js/*.js', './src/js/**/*.js'], ugJS).on('change', reload)
    watch(['./src/images/*.*', './src/images/**/*.*'], img).on('change', reload)
    done();
}

exports.default = series(parallel(htmltemplate, styleSass, ugJS, img), browser);


//上線使用  css跨瀏覽器
 
const autoprefixer = require('gulp-autoprefixer');

function prefix() {
    return src('dest/css/*.css')
    .pipe(autoprefixer({
        cascade: false
    })).pipe(rename({
        extname: '.autoprefix.css'
    }))
    .pipe(dest('dest/css'))
}
exports.auto = prefix;

// 壓圖 
const imagemin = require('gulp-imagemin');

function img_c(){
    return src('src/images/*.*')
    .pipe(imagemin())
    .pipe(dest('dest/images'))
}

exports.images = img_c;


// es6- es5

const babel = require('gulp-babel');

function babel5() {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dest/js'));
}

exports.js = babel5;

//清除舊檔案

const clean = require('gulp-clean');

function clear() {
  return src('dest' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}
exports.cls  = clear;


// 上線用
exports.online = series(clear, parallel(htmltemplate, styleSass,babel5 , img_c))














