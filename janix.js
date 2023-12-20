const num = Math.floor(Math.random() * 50);

const input = document.querySelector('input');
const status = document.querySelector('.status');
const result = document.querySelector('.result');
const guess = document.querySelector('#guess');
const audio = document.querySelector('#audio');
let isGuessed = false;
const pg = document.querySelector('#pg');
const fr = document.querySelector('.fr');


pg.addEventListener('click',()=>{
    location.reload();
})



guess.addEventListener('click',()=>{
    
    console.log(num);

    if(input.value < num){
        status.innerHTML = 'Too low';
        isGuessed = false;
    }else if(input.value > num){
        status.innerHTML = 'Too high';
        isGuessed = false;
    }else{
        status.innerHTML = 'You guessed the correct number';
        result.style.width = '250px';
        fr.style.display = 'block';
        isGuessed = true;
        pg.style.display = 'block';
        audio.play();
    }


    result.textContent = (isGuessed == false) ? '?' : num;
})
