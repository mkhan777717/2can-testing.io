export function initFooter() {

    // Check if the URL includes 'work' and set proper activeLink
    let activeLink = '';
    if (window.location.href.includes('work')) {
        activeLink = 'work';
    } else if(window.location.href.includes('about')){
        activeLink = 'about';
    } else {
        activeLink = 'index';
    }

    const footer = document.createElement('footer');
    footer.innerHTML = `
     <footer class="footerBg">
            <div class="footerWrapper">
                <div class="footCol">
                    <img src="./assets/logo-new.png" alt="logo" width="200" />
                    <p>Build Brands with soul, story & a splash of rebellion.</p>
                </div>
                <div class="quickLinks">
                    <h3>Quick Links</h3>
                    <a href="/" class="${activeLink === 'index' ? 'text-yellow' : ''}">Home</a>
                    <a href="">What we do?</a>
                    <a href="/work.html" class="${activeLink === 'work' ? 'text-yellow' : ''}>What we did?</a>
                    <a href="/about.html" class="${activeLink === 'about' ? 'text-yellow' : ''}>Who are we?</a>
                    <a href="https://wa.me/message/I446ELKXA7UUF1" target="_blank" title="Chat on Whatsapp">Where are
                        we?</a>
                </div>

                <div class="quickLinks">
                    <h3>Let's Connect</h3>
                    <div>
                        <span class="text-yellow">Email:</span> 2cancreation@gmail.com
                    </div>
                    <div>
                        <span class="text-yellow">Phone:</span> +91921147707
                    </div>
                </div>
            </div>

            <center>
                <hr>
                <div class="bottomFooterWrapper">
                    <p>© 2026 2CAN Creations. All rights reserved. No templates were harmed in the making of this site.
                    </p>
                    <br>
                    <button class="footerBtn">Emotional, not automated</button>
                </div>
            </center>
        </footer>`;
    return footer;
}