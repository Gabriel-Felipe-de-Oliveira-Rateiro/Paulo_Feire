'use strict'

/* FUNÇÃO ESCREVNDO LETRA*/
function escrevendoLetra() {
    
    function ativaLetra(e) {
    
        const arrayTexto = e.innerHTML.split('');
        e.innerHTML = '';
        arrayTexto.forEach((letra, i) => {
    
            setTimeout(() => {
    
                e.innerHTML += letra;
    
            }, 300 * i )
    
        })
    
    }
    
    const titulo = document.querySelector('.digitando');
    ativaLetra(titulo);

}

escrevendoLetra();

/* FUNÇÃO DO MENU NO MOBILE */
/*function menuMobol() {

    const activeMenu = document.querySelector('.fa-bars');
    const navMenu = document.querySelector('header .navegacao-primaria');
        
        
    activeMenu.addEventListener('click',()=>{

        activeMenu.classList.toggle('fa-x');
        navMenu.classList.toggle('ativado');
    
    });

}

menuMobol();*/

/* FUNÇÃO SEÇÃO EXPERIENCIAS E FORMÇÃO DE PAULO FREIRE */
function sobrePauloFreire() {
    
    const divExperiencia = document.querySelectorAll('.experience_content div');
    const liExperiencia = document.querySelectorAll('.experience_content ul li');
    const divEducation = document.querySelectorAll('.education_content div');
    const liEducation = document.querySelectorAll('.education_content ul li');

    divExperiencia[0].classList.add('ativo');
    divEducation[0].classList.add('ativo');
    liExperiencia[0].classList.add('ativo');
    liEducation[0].classList.add('ativo');

    function slideShow(index) {

        divExperiencia.forEach((div) => {

            div.classList.remove('ativo');
            
        });

        liExperiencia.forEach((botao) => {

            botao.classList.remove('ativo');

        });

        divExperiencia[index].classList.add('ativo');
        liExperiencia[index].classList.add('ativo');

    } 

    function slideShow2(index) {

        divEducation.forEach((div) => {

            div.classList.remove('ativo');
            
        });

        liEducation.forEach((botao) => {

            botao.classList.remove('ativo');

        });

        divEducation[index].classList.add('ativo');
        liEducation[index].classList.add('ativo');

    } 

    liExperiencia.forEach((event, index) => {

        event.addEventListener('click', () => {

            slideShow(index);

        });
        
    });

    liEducation.forEach((event, index) => {

        event.addEventListener('click', () => {

            slideShow2(index);

        });
        
    });
    
}

sobrePauloFreire();

/* SLIDE 1 QUE FALA SOBRES AS PRINCIPAIS OBRAS DE PAULO FREIRE*/
const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]');
const navNexButton = document.querySelector('[data-slide="nav-next-button"]');
const controlsWapper = document.querySelector('[data-slide="controls-wrapper"]');
let slideItems = document.querySelectorAll('[data-slide="item"]');
let controlButtons;
let slidInterval;

const state = {

    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    moviment: 0,
    curretSlideIndex: 0,
    autoPlay: true,
    timeInterval: 0

}

function translateSlide({ position }) {
    
    state.savedPosition = position;
    slideList.style.transform = `translateX(${position}px)`;

}

function getCenterPosition({ index }) {
    
    const slideItem = slideItems[index];
    const slideWidth = slideItem.clientWidth;
    const windowWidth = document.body.clientWidth;
    const margin = (windowWidth - slideWidth) / 2;
    const position = margin - (index * slideWidth);
    return position

}

function setVisibleSlide({ index, animate }) {
    
    if (index === 0 || index === slideItems.length -1) {
    
        index = state.curretSlideIndex;
        
    }

    const position = getCenterPosition({ index })
    state.curretSlideIndex = index;
    slideList.style.transition = animate === true ? 'transform .5s' : 'none';
    activeControlButton({ index });
    translateSlide({ position: position });

}

function nextSlide() {
    
    setVisibleSlide({ index: state.curretSlideIndex + 1, animate:true});

}

function previousSlide() {
    
    setVisibleSlide({ index: state.curretSlideIndex - 1, animate:true});

}

function createControlButtons() {
    
    slideItems.forEach(function(){

        const controlButton = document.createElement('button');
        controlButton.classList.add('slide-control-button');
        controlButton.classList.add('fa-solid');
        controlButton.classList.add('fa-circle');
        controlButton.dataset.slide = 'control-button';
        controlsWapper.append(controlButton);

    });

}


function activeControlButton({ index }) {
    
    const slideItem = slideItems[index];
    const dataIndex = Number(slideItem.dataset.index)
    const controlButton = controlButtons[dataIndex];

    controlButtons.forEach(function(controlButtonItem) {

        controlButtonItem.classList.remove('active');

    });

    if(controlButton) controlButton.classList.add('active');

}

function createSlideClones() {
    
    const firstSlide = slideItems[0].cloneNode(true)
    firstSlide.classList.add('slide-cloned')
    firstSlide.dataset.index = slideItems.length

    const secondSlide = slideItems[1].cloneNode(true)
    secondSlide.classList.add('slide-cloned')
    secondSlide.dataset.index = slideItems.length + 1

    const lastSlide = slideItems[slideItems.length - 1].cloneNode(true)
    lastSlide.classList.add('slide-cloned')
    lastSlide.dataset.index = -1

    const penultimateSlide = slideItems[slideItems.length - 2].cloneNode(true)
    penultimateSlide.classList.add('slide-cloned')
    penultimateSlide.dataset.index = -2

    slideList.append(firstSlide)
    slideList.append(secondSlide)
    slideList.prepend(lastSlide)
    slideList.prepend(penultimateSlide)

    slideItems = document.querySelectorAll('[data-slide="item"]')

}

function onMouseDown(event, index) {
    
    const slideItem = event.currentTarget;
    state.startingPoint = event.clientX;
    state.currentPoint = event.clientX - state.savedPosition;
    state.curretSlideIndex = index;
    slideList.style.transition = 'none';
    slideItem.addEventListener('mousemove', onMouseMove); /* mover  DO MAUSE */

}

function onMouseMove(event) {
    
    state.moviment = event.clientX - state.startingPoint;
    const position = event.clientX - state.currentPoint;
    translateSlide({ position });

}

function onMouseUp(event) {

    const pointsToMove = event.type.includes('touch') ? 50 : 150; 
    const slideItem = event.currentTarget;

    if (state.moviment < -pointsToMove) {
        
        nextSlide();

    }else if(state.moviment > pointsToMove ) {

        previousSlide();


    }else {

        setVisibleSlide({ index: state.curretSlideIndex, animate:true});

    }

    slideItem.removeEventListener('mousemove', onMouseMove); 

}

function onTouchStart(event, index) {

    event.clientX = event.touches[0].clientX;
    onMouseDown(event, index);
    const slideItem = event.currentTarget;
    slideItem.addEventListener('touchmove', onTouchMuve);

}

function onTouchMuve(event) {
    
    event.clientX = event.touches[0].clientX;
    onMouseMove(event);

}

function onTouchEnd(event) {
    
    onMouseUp(event);
    const slideItem = event.currentTarget;
    slideItem.removeEventListener('touchmove', onTouchMuve);

}

function onControlButtonClick(index) {

    setVisibleSlide({ index: index + 2, animate:true });

};

function onSlideListTransitionEnd() {
    
    const slideItem = slideItems[state.curretSlideIndex]

    if (slideItem.classList.contains('slide-cloned') && Number(slideItem.dataset.index) > 0) {
    
        setVisibleSlide({ index: 2, animate:false}) 
        
    }

    if (slideItem.classList.contains('slide-cloned') && Number(slideItem.dataset.index) < 0 ) {
    
        setVisibleSlide({ index: slideItems.length -3, animate:false}) 
        
    }

}

function setAutoPlay() {
    
    if (state.autoPlay) {
        
        slidInterval = setInterval(function() {
        
            setVisibleSlide({index: state.curretSlideIndex + 1, animate: true})
    
        }, state.timeInterval)

    }

}

function setListeners() {

    controlButtons = document.querySelectorAll('[data-slide="control-button"]');

    controlButtons.forEach(function(controlButton, index) {

        controlButton.addEventListener('click', function(event) {

            onControlButtonClick(index);

        });

    });

    slideItems.forEach(function (slideItem, index) {
    
        slideItem.addEventListener('dragstart', function(event) {
    
            event.preventDefault()
    
        });
    
        slideItem.addEventListener('mousedown', function(event) {
    
            onMouseDown(event, index);
    
        });
    
        slideItem.addEventListener('mouseup', onMouseUp);

        slideItem.addEventListener('touchstart', function(event) {
    
            onTouchStart(event, index);
    
        });
    
        slideItem.addEventListener('touchend', onTouchEnd);
    
    
    });

    navNexButton.addEventListener('click', nextSlide);
    navPreviousButton.addEventListener('click', previousSlide);

    slideList.addEventListener('transitionend', onSlideListTransitionEnd)
    slideWrapper.addEventListener('mouseenter', function() {
        
        clearInterval(slidInterval);

    });

    slideWrapper.addEventListener('mouseleave', function () {
        
        setAutoPlay();

    });

    let resizeTimeout;

    window.addEventListener('resize', function() {
        
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(function () {
            
            setVisibleSlide({ index: state.curretSlideIndex, animate:true });

        }, 1000);

    });

};

function initSlider ({ startAtIndex = 0, autoPlay = true, timeInterval = 3000}) {

    state.autoPlay = autoPlay;
    state.timeInterval = timeInterval;
    createControlButtons();
    createSlideClones();
    setListeners();
    setVisibleSlide({ index: startAtIndex + 2 , animate:true });
    setAutoPlay()

}