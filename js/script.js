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

    const articleSelector = clickedElement.getAttribute('href');
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

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList:', titleList);
    titleList.innerHTML = ('');

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles:', articles);

    let html = '';

    for (let article of articles) {

        /* get the article id */

        let articleID = article.getAttribute('id');
        console.log('articleID:', articleID);

        /* find the title element */ /* get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log('articleTitle:', articleTitle);

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleID + '">' + articleTitle + '</a></li>';
        console.log('linkHTML:', linkHTML);

        /* insert link into html variable */

        html = html + linkHTML;
        console.log('html:', html);
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
        console.log('link:', link);
    }
}

generateTitleLinks();


generateTags();

/* tag click */

function tagClickHandler(event){

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    console.log('event:', event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log('tag:', tag);

    /* find all tag links with class active */

    const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('tagsActive:', tagsActive);

    /* START LOOP: for each active tag link */

    for(let tagActive of tagsActive){
        /* remove class active */

        tagActive.classList.remove('active');

        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(allTagsLinks);

    /* START LOOP: for each found tag link */
    for(let allTagLinks of allTagsLinks){

        /* add class active */

        allTagLinks.classList.add('active');
        console.log(allTagLinks);

        /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

    /* find all links to tags */

    const articleTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log('articleTagsLinks: ', articleTagsLinks);

    /* START LOOP: for each link */

    for(let articleTagsLink of articleTagsLinks){

        /* add tagClickHandler as event listener for that link */

        articleTagsLink.addEventListener('click', tagClickHandler);
        console.log('articleTagsLink: ', articleTagsLink);

        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

/* generating authors */

function generateAuthors(){

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles:', articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

        /* find author wrapper */

        const AuthorList = article.querySelector(optArticleAuthorSelector);
        console.log('AuthorList:', AuthorList);

        /* get author from data-author attribute */

        let articleDataAuthor = article.getAttribute('data-author');
        console.log('articleDataAuthor:', articleDataAuthor);

        /* get author for link - without space in name */

        let articleDataAuthorLink = article.getAttribute('data-author').replace(' ', '');
        console.log('articleDataAuthorLink:', articleDataAuthorLink);

        let authorHTML = '<a href="#author-' + articleDataAuthorLink + '">' + articleDataAuthor + '</a>';

        /* insert HTML of all the links into the author wrapper */

        AuthorList.innerHTML = authorHTML;
        console.log('AuthorList2:', AuthorList);
    }
}

generateAuthors();

/* author click */

function authorClickHandler(event){

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    console.log('event:', event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');
    console.log('author:', author);

    /* write author from href the way it is in the data-author by adding space between first and last name */

    const authorHref = author.replace(/([A-Z])/g, ' $1').trim();
    console.log('authorHref:', authorHref);

    /* find all author links with class active */

    const authorsActive = document.querySelectorAll('a.active[href^="#author-"]');
    console.log('authorsActive:', authorsActive);

    /* START LOOP: for each active author link */

    for(let authorActive of authorsActive){

        /* remove class active */

        authorActive.classList.remove('active');

        /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */

    const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(allAuthorLinks);

    /* START LOOP: for each found tag link */
    for(let allAuthorLink of allAuthorLinks){

        /* add class active */

        allAuthorLink.classList.add('active');
        console.log(allAuthorLink);

        /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    /* we search for data-author not href-author */

    generateTitleLinks('[data-author="' + authorHref + '"]');

}

function addClickListenersToAuthors(){

    /* find all links to tags */

    const articleAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
    console.log('articleTagsLinks: ', articleAuthorsLinks);

    /* START LOOP: for each link */

    for(let articleAuthorsLink of articleAuthorsLinks){

        /* add tagClickHandler as event listener for that link */

        articleAuthorsLink.addEventListener('click', authorClickHandler);
        console.log('articleTagsLink: ', articleAuthorsLink);

        /* END LOOP: for each link */
    }
}

addClickListenersToAuthors();


/* generating list of tags in aside and under article */

function generateTags(){

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];

    /* delete aside tags list in html */

    const tagsListAside = document.querySelector(optTagsListSelector);
    console.log('titleList:', tagsListAside);
    tagsListAside.innerHTML = ('');

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles:', articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

        /* find tags wrapper */

        const tagsList = article.querySelector(optArticleTagsSelector);
        console.log('tagsList:', tagsList);

        /* make html variable with empty string */
        let html = '';
        console.log('html:', html);

        /* get tags from data-tags attribute */

        let articleDataTags = article.getAttribute('data-tags');
        console.log('articleDataTags:', articleDataTags);

        /* split tags into array */

        let articleTags = articleDataTags.split(' ');
        console.log('articleTags :', articleTags);


        /* START LOOP: for each tag */

        for (let articleTag of articleTags) {
            console.log('articleTag: ', articleTag);

            /* generate HTML of the link */

            const tagsHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
            console.log('tagsHTML:', tagsHTML);

            /* add generated code to html variable */

            html = html + tagsHTML;
            console.log('html:', html);

            /* [NEW] check if this link is NOT already in allTags */
            if(allTags.indexOf(tagsHTML) == -1){
                /* [NEW] add generated code to allTags array */
                allTags.push(tagsHTML);
            }

            /* END LOOP: for each tag */

        }

        /* insert HTML of all the links into the tags wrapper */

        tagsList.innerHTML = html;

        console.log('tagsList:', tagsList);

        /* END LOOP: for every article: */

    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');

}









