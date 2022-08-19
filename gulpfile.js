
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

