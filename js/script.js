const menuHambuerger = document.querySelector('.menu-hamburger')
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const navMobile = document.querySelector('.nav-mobile');

menuHambuerger.addEventListener('click', () =>{
    line1.classList.toggle('active');
    line2.classList.toggle('active');
    line3.classList.toggle('active');
    navMobile.classList.toggle('active')
})