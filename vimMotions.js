// ==UserScript==
// @name         Vim Motions
// @namespace    https://github.com/CleoMenezesJr
// @version      1.0.0
// @description  Bring basic vim motions
// @author       Cleo Menezes Jr.
// ==/UserScript==
//

(function() {
    let inputBuffer = '';
    const bufferLimit = 2;

    function handleVimMotion(event) {
        inputBuffer += event.key;

        if (inputBuffer.length > bufferLimit) {
            inputBuffer = inputBuffer.slice(1);
        }

        switch (event.key) {
            case 'h':
                window.scrollBy(-50, 0);
                break;
            case 'j':
                window.scrollBy(0, 50);
                break;
            case 'k':
                window.scrollBy(0, -50);
                break;
            case 'l':
                window.scrollBy(50, 0);
                break;
            case 'g':
                if (inputBuffer === 'gg') {
                    window.scrollTo(0, 0);
                    inputBuffer = '';
                }
                break;
            case 'G':
                window.scrollTo(0, document.body.scrollHeight);
                break;
            default:
                inputBuffer = '';
                break;
        }
    }

    document.addEventListener('keydown', handleVimMotion);
})();
