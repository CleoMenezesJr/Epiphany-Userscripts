// ==UserScript==
// @name         Dark Mode
// @namespace    https://github.com/CleoMenezesJr
// @version      1.0.2
// @description  Force dark mode in a dumb way
// @author       Cleo Menezes Jr.
// ==/UserScript==

(function() {
    function setDarkMode(colorScheme) {
        const html = document.documentElement;
        const body = document.body;

        // Blacklist websites
        const blacklistHostnames = ['exemple.org'];
        if (blacklistHostnames.includes(window.location.hostname)) {
            return;
        }

        // Blacklist json page
        const firstMeta = document.head.querySelector('meta');
        if (firstMeta && firstMeta.getAttribute('content') === 'light dark') {
            return;
        }

        // Blacklist Epiphany pages
        const firstDiv = body.querySelector('div');
        if (
            (firstDiv && firstDiv.id === 'overview') ||
            (body.classList.contains('error-body') && body.classList.contains('default')) ||
            (body.classList.contains('error-body') && body.classList.contains('danger')) ||
            body.classList.contains('applications-body')
        ) {
            return;
        }

        // Check if any class contains "light" and replace it with "dark"
        let hasColorSchemeClass;
        [html, body].forEach(element => {
            const classes = Array.from(element.classList);
            classes.forEach(className => {
                if (className.includes('light') || className.includes('dark')) {
                    html.classList.replace(
                        className,
                        className.replace(
                            className.includes(colorScheme == 'light' ? 'dark' : 'light') && colorScheme == 'light' ? 'dark' : 'light',
                            colorScheme
                        )
                    );
                }
            });

            hasColorSchemeClass = classes.some(className => className.includes('light') || className.includes('dark'));
        });
        if (hasColorSchemeClass) return


        const hasDarkValue = Array.from(html.attributes).some(attr =>
            attr.name.includes('dark') || attr.value.includes('dark')
        );

        if (!hasDarkValue) {
            html.classList.add('invert-colors');
        }

    }

    // Auto light/dark mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const colorScheme = event.matches ? "dark" : "light";
        setDarkMode(colorScheme);
    })

    window.addEventListener("load", () => {
        setTimeout(() => {
            setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }, "300");
    });

})();
