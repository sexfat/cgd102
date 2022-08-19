
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
   return src('src/css/style.css')
          .pipe(cleanCSS())
          .pipe(dest('dest/css'))
}

