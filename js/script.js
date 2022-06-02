'use strict'


//Функция заработает после загрузки страницы
window.onload = function() {
    const parallax = document.querySelector('.parallax_section');

    if(parallax){
        const content = document.querySelector('.parallax_wrapper')
        const clouds = document.querySelector('.parallax_cloud');
        const mountains = document.querySelector('.parallax_mountains');
        const human = document.querySelector('.parallax_human');

        // Коэффициенты
        const forCloud = 40;
        const forMountains = 20;
        const forHuman = 10;

        // Скорость анимации
        const speed = 0.05;

        // Объявление переменных
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {

            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            clouds.style.cssText= `transform: translate(${positionX / forCloud}%,${positionY / forCloud}%);`;
            mountains.style.cssText= `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
            human.style.cssText= `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

           requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle()

        parallax.addEventListener("mousemove", function(e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;
            //Ноль по середине
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            // Получение процентов
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
            
        });

        //Прарадллакс при скроле

        let thresholdSets = []

        for(let i = 0; i <= 1.0; i += 0.005){
            thresholdSets.push(i);
        }

        const callBack = function(entries, observer) {

            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemStyle(scrollTopProcent)
        };

        const observer = new IntersectionObserver(callBack, {
            threshold:thresholdSets
        });

        observer.observe(document.querySelector('.about_page'))

        function setParallaxItemStyle(scrollTopProcent){
            content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 1}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
        }

    }

}


