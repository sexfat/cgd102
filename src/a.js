// jquery
// import $ from 'jquery';
// sass
import './css/style.scss';
//css
import './css/header.css';

$('body').css('background-color' , 'green');

// gsap
import { gsap } from "gsap";

gsap.to('.box' , {
   x : 400,
   y: 300,
   rotation : 180,
   duration: 5,
   scale : 2,
   backgroundColor : "red"
})


console.log('webpack go');
const x = 100;
console.log(x);