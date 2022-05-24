'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href')
    console.log('articleSelector:', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('active:', targetArticle);

    /* Poszukałem własnoręcznie rozwiązania przed sprawdzeniem podpowiedzi - po zagłebieniu się w wiedzę tajemną dotyczącą usuwania hasha z atrybutu href oraz poźniejszym szukaniu elementu po id, które jest równe atrybutowi href bez hasha i wyszło mi to co poniżej:

        get 'href' attribute from the clicked link

                const clickedHref = clickedElement.getAttribute('href').replace(/^#/, '');
                console.log('href:', clickedHref);

        find the correct article using the selector (value of 'href' attribute)

                const clickedArticles = document.getElementById(clickedHref);
                console.log('clickedArticles:', clickedArticles);

        add class 'active' to the correct article
        
                clickedArticles.classList.add('active');
                console.log('active:', clickedArticles);

    I działało tak jak powinno.

    Po sprawdzeniu gotowego rozwiązania z modułu zmieniłem swój kod na taki jak poniżej:

            get 'href' attribute from the clicked link

                const articleSelector = clickedElement.getAttribute('href')
                console.log('articleSelector:', articleSelector);

            find the correct article using the selector (value of 'href' attribute)

                const targetArticle = document.querySelector(articleSelector);
                console.log('targetArticle:', targetArticle);

            add class 'active' to the correct article
        
                targetArticle.classList.add('active');
                console.log('active:', targetArticle);

        Zostawię moje rozwiązanie tutaj w komentarzu, na spotkaniu ewentualnie powiesz mi co jest z nim nie tak, prócz tego, że można zrobić to łatwiej.

    */

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}