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

/* moduł 5.4 */

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList:', titleList);
    titleList.innerHTML = ('');

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {

        /* get the article id */

        let articleID = article.getAttribute('id');
        console.log('articleID:', articleID);

        /* find the title element */ /* get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log('articleTitle:', articleTitle);

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
        console.log('linkHTML:', linkHTML);

        /* insert link into html variable */

        html = html + linkHTML;
        console.log('html:', html);
    }

    titleList.innerHTML = html;
}

generateTitleLinks();






