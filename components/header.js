export function initHeader() {

    let activeLink = '';
    if (window.location.href.includes('work')) {
        activeLink = 'work';
    } else if (window.location.href.includes('about')) {
        activeLink = 'about';
    } else {
        activeLink = 'index';
    }

    const header = document.createElement('header');
    // Add style to make header sticky if not handled by CSS already
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '1000';
    header.style.background = 'black';

    header.innerHTML = `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>2CAN creations</title>
        <meta name="description" content="2CAN creations - One stop solution for all your marketing needs">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.cdnfonts.com/css/general-sans" rel="stylesheet">
        <link rel="stylesheet" href="./style.css">
        <link rel="icon" type="image/png" href="/assets/favicon.png">
    </head>
         <nav class="navPad">
        <a href="/">
            <img class="logo" src="./assets/logo-new.png" alt="logo" />
        </a>
        <div class="rightItemsNav" id="navMenu">
            <a class="${activeLink === 'index' ? 'active' : ''}">Home</a>
            <a href="#whatWeDo" class="${activeLink === 'work' ? 'active' : ''}">What we do?</a>
            <a href="./work.html">What we did?</a>
            <a href="./about.html" class="${activeLink === 'about' ? 'active' : ''}">Who are we?</a>
            <a href="https://wa.me/message/I446ELKXA7UUF1" target="_blank" title="Chat on Whatsapp"
                class="whereWeAreBtn">Where are we?</a>
        </div>

        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
    `;
    return header;
}