// jquery
import $ from 'jquery';
import './css/style.css';
import './css/header.css';

$('body').css('background-color' , 'green');

// gsap
import { gsap } from "gsap";

gsap.to('.box' , {
   x : 400,
   y: 300,
   rotation : 180,
   duration: 5
})


console.log('webpack go');
const x = 100;
console.log(x);