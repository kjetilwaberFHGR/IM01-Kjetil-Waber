// 1 Demo suchen, sonst nichts tun
const demo = document.querySelector(".demo");

if (demo) {
    // 2 Elemente holen
    const buttons = demo.querySelectorAll("[data-mode-button]");
    const release = demo.querySelector("[data-release]");
    const bars = demo.querySelectorAll(".sensor-bar");
    const caption = demo.querySelector("figcaption");

    // 3 Einstellungen
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rowDelay = {
        rolling: 40,
        global: 0
    };
    const captions = {
        rolling: "Rolling Shutter · jede Zeile 40 ms später, der Balken steht schief",
        global: "Global Shutter · alle Zeilen gleichzeitig, der Balken steht gerade"
    };
    let frozen = false;
    let timers = [];

    // 4 Auslösen: Zeile für Zeile anhalten, von oben nach unten
    function capture() {
        const start = bars[0].getAnimations()[0].currentTime;
        const mode = demo.dataset.mode;
        bars.forEach(function (bar, index) {
            const animation = bar.getAnimations()[0];
            const delay = index * rowDelay[mode];
            const timer = setTimeout(function () {
                animation.pause();
                animation.currentTime = start + delay;
            }, reduceMotion ? 0 : delay);
            timers.push(timer);
        });
        frozen = true;
        release.textContent = "Neues Bild";
        caption.textContent = captions[mode];
    }

    // 5 Neues Bild: alle Zeilen starten wieder gemeinsam
    function restart() {
        timers.forEach(function (timer) {
            clearTimeout(timer);
        });
        timers = [];
        bars.forEach(function (bar) {
            const animation = bar.getAnimations()[0];
            animation.pause();
            animation.currentTime = 0;
            if (!reduceMotion) {
                animation.play();
            }
        });
        frozen = false;
        release.textContent = "Auslösen";
        caption.textContent = "Bereit · Drücken Sie «Auslösen»";
    }

    // 6 Ein Knopf, zwei Aufgaben
    release.addEventListener("click", function () {
        if (frozen) {
            restart();
        } else {
            capture();
        }
    });

    // 7 Umschalten zwischen Rolling und Global
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            demo.dataset.mode = button.dataset.modeButton;
            buttons.forEach(function (other) {
                other.setAttribute("aria-pressed", "false");
            });
            button.setAttribute("aria-pressed", "true");
            restart();
        });
    });
}