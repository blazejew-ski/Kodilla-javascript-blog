'use strict';

const opts = {
    tagSizes: {
        count: 5,
        classPrefix: 'tag-size-',
    },
};
const select = {
    all: {
        articles: '.post',
        linksTo: {
            tags: 'a[href^="#tag-"]',
            authors: 'a[href^="#author-"]',
        },
    },
    article: {
        tags: '.post-tags .list',
        author: '.post-author',
        title: '.post-title',
    },
    listOf: {
        titles: '.titles',
        tags: '.tags.list',
        authors: '.authors.list',
    },
    anchors: {
        tag: '#tag-',
        author: '#author-'
    }
};

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-article-author').innerHTML)
};


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

function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    console.log('titleList:', titleList);
    titleList.innerHTML = ('');

    /* for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    console.log('articles:', articles);

    /* create empty html variable */
    let html = '';

    for (let article of articles) {

        /* get the article id */
        let articleID = article.getAttribute('id');
        console.log('articleID:', articleID);

        /* find the title element */ /* get the title from the title element */
        const articleTitle = article.querySelector(select.article.title).innerHTML;
        console.log('articleTitle:', articleTitle);

        /* create HTML of the link with handlebars */
        //const linkHTML = '<li><a href="#' + articleID + '">' + articleTitle + '</a></li>';
        const linkHTMLData = {id: articleID, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
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
    const articleTagsLinks = document.querySelectorAll(select.all.linksTo.tags);
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

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* delete aside authors list in html */
    const AuthorsListAside = document.querySelector(select.listOf.authors);
    console.log('titleList:', AuthorsListAside);
    AuthorsListAside.innerHTML = ('');

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    console.log('articles:', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

        /* find author wrapper */
        const AuthorList = article.querySelector(select.article.author);
        console.log('AuthorList:', AuthorList);

        /* make html variable with empty string */
        let html = '';
        console.log('html:', html);

        /* get author from data-author attribute */
        let articleDataAuthor = article.getAttribute('data-author');
        console.log('articleDataAuthor:', articleDataAuthor);

        /* get author for display - without dash in name */
        let articleDataAuthorName = article.getAttribute('data-author').replace('-', ' ');
        console.log('articleDataAuthorName:', articleDataAuthorName);

        /* create html link */
        //let authorHTML = '<a href="#author-' + articleDataAuthor + '">' + //// articleDataAuthorName + '</a>';

        /* generate HTML of the link with handlebars */

        const linkHTMLData = {id: select.anchors.author + articleDataAuthor, author: articleDataAuthorName};
        const authorHTML = templates.authorLink(linkHTMLData);


        /* insert HTML link into the author wrapper */
        AuthorList.innerHTML = authorHTML;
        console.log('AuthorList2:', AuthorList);

        /* [NEW] check if this link is NOT already in allAuthors */
        if(!allAuthors.hasOwnProperty(articleDataAuthor)){

            /* [NEW] add articleDataAuthor to allAuthors object */
            allAuthors[articleDataAuthor] = 1;
        } else {
            allAuthors[articleDataAuthor]++;
        }
    }

    /* [NEW] find list of authors in right column */
    const asideAuthorsList = document.querySelector(select.listOf.authors);
    console.log('allAuthors:', allAuthors);

    /* [NEW] create calculation variable */
    const authorsParams = calculateParams(allAuthors);
    console.log('authorsParams: ', authorsParams);

    /* [NEW] create variable fo all links in HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
        let articleDataAuthorName = author.replace('-', ' ');
        console.log('articleDataAuthorName:', articleDataAuthorName);

        /* [NEW] generate code of a link and add it to allAuthorsHTML */
        const authorLinkHTML = '<li><a href="#author-' + author + '">' + articleDataAuthorName + '</a> (' + allAuthors[author] + ')</li>';
        console.log('authorLinkHTML: ', authorLinkHTML);
        allAuthorsHTML += authorLinkHTML;
        console.log('allAuthorsHTML:', allAuthorsHTML);
    }

    /* [NEW] END LOOP: for each author in allAuthors: */
    /* [NEW] add html from allAuthorsHTML to asideAuthorsList */
    asideAuthorsList.innerHTML = allAuthorsHTML;

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
    generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

    /* find all links to authors */
    const articleAuthorsLinks = document.querySelectorAll(select.all.linksTo.authors);
    console.log('articleAuthorsLinks: ', articleAuthorsLinks);

    /* START LOOP: for each link */
    for(let articleAuthorsLink of articleAuthorsLinks){

        /* add tagClickHandler as event listener for that link */
        articleAuthorsLink.addEventListener('click', authorClickHandler);
        console.log('articleAuthorsLink: ', articleAuthorsLink);

        /* END LOOP: for each link */
    }
}

addClickListenersToAuthors();

/* calculate params - tags and authors count */
function calculateParams(tags = ''){

    /* check all tags/authors given to function */
    console.log('tags: ', tags);

    /* set max and min of params */
    const params = {max: 0, min: 999999};
    console.log('params: ', params);

    for(let tag in tags){

        /* calculate how many times tag/author is counted in tags/authors */
        console.log(tag + ' is used ' + tags[tag] + ' times');

        /* check for maximal number of single apperance of tags/authors */
        if(tags[tag] > params.max){
            params.max = tags[tag];
            console.log('params.max: ', params.max);

            /* check for minimal number of single apperance of tags/authors */
        } else if(tags[tag] < params.min){
            params.min = tags[tag];
            console.log('params.min: ', params.min);
        }
    }

    /* return given max and min numer of apperances */
    return params;

}

/* calculate tag class */
function calculateTagClass(count = '', params = ''){

    /* log how many times does this tag appear (count) with max and minimal amount of all tags (params) */
    console.log('count: ', count);
    console.log('params: ', params);

    /* how many more appearances has this tag than minumum */
    const normalizedCount = count - params.min;
    console.log('normalizedCount: ', normalizedCount);

    /* difference between max and min apperances of all tags */
    const normalizedMax = params.max - params.min;
    console.log('normalizedMax: ', normalizedMax);

    /* where the tag comes in number of apperances calculated between 1 and 0 */
    const percentage = normalizedCount / normalizedMax;
    console.log('percentage: ', percentage);

    /* calculated class number based on percentage of apperances of all given tags */
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );
    console.log('classNumber: ', classNumber);

    /* add class number to class */
    const tagClass = opts.tagSizes.classPrefix + classNumber;

    /* return class name */
    return tagClass;
}


/* generating list of tags in aside and under article */

function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* delete aside tags list in html */
    const tagsListAside = document.querySelector(select.listOf.tags);
    console.log('titleList:', tagsListAside);
    tagsListAside.innerHTML = ('');

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    console.log('articles:', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

        /* find tags wrapper */
        const tagsList = article.querySelector(select.article.tags);
        console.log('tagsList:', tagsList);

        /* make html variable with empty string */
        let html = '';
        console.log('html:', html);

        /* get tags from data-tags attribute */
        let articleDataTags = article.getAttribute('data-tags');
        console.log('articleDataTags:', articleDataTags);

        /* split tags into array */

        let tags = articleDataTags.split(' ');
        console.log('tags :', tags);


        /* START LOOP: for each tag */

        for (let tag of tags) {
            console.log('tag: ', tag);

            /* generate HTML of the link with handlebars */

            const linkHTMLData = {id: select.anchors.tag + tag, tag: tag};
            const linkHTML = templates.tagLink(linkHTMLData);

            //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            console.log('linkHTML:', linkHTML);

            /* add generated code to html variable */

            html = html + linkHTML;
            console.log('html:', html);

            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)){
                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }

            /* END LOOP: for each tag */

        }

        /* insert HTML of all the links into the tags wrapper */

        tagsList.innerHTML = html;

        console.log('tagsList:', tagsList);

        /* END LOOP: for every article: */

    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    console.log('allTags:', allTags);

    /* [NEW] create calculation variable */

    const tagsParams = calculateParams(allTags);
    console.log('tagsParams: ', tagsParams);

    /* [NEW] create variable fo all links in HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */

    for(let tag in allTags){

        /* [NEW] generate code of a link and add it to allTagsHTML */

        // const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a> (' + allTags[tag] + ')</li>';
        const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li> ';
        console.log('tagLinkHTML: ', tagLinkHTML);

        allTagsHTML += tagLinkHTML;

        // allTagsHTML += tag + ' (' + allTags[tag] + ')';
        // allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a> (' + allTags[tag] + ')</li>';

        console.log('allTagsHTML:', allTagsHTML);
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add html from allTagsHTML to tagList */

    tagList.innerHTML = allTagsHTML;

}









