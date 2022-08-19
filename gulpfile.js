
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
function move(){
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
exports.sync =  parallel( taskA ,  taskB);

// 非同步
exports.async = series(taskA , taskB);

// 壓縮 美化css
const cleanCSS = require('gulp-clean-css');

function minicss(){
   return src('src/css/*.css') //來源檔案
//    return src(['src/css/*.css' , 'src/a/*.css']) // 多個不同路徑
          .pipe(cleanCSS())//編譯方法
          .pipe(dest('dest/css'))//目的地
}

exports.minCss = minicss;


//壓縮js  改名

const uglify = require('gulp-uglify'); 
const rename = require('gulp-rename');

function ugJS(){
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

function htmltemplate(){
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
function img(){
    return src('src/images/*.*').pipe(dest('dest/images'))
}



function w(){
  watch(['./src/sass/*.scss' , './src/sass/**/*.scss'], styleSass);
  watch(['./src/*.html' , './src/layout/*.html'], htmltemplate);
  watch(['./src/js/*.js' , './src/js/**/*.js'], ugJS);
  watch(['./src/images/*.*' , './src/images/**/*.*'], img);
}
// 先打包在監看變動
exports.dev = series(parallel(htmltemplate , styleSass ,ugJS, img) , w)  



