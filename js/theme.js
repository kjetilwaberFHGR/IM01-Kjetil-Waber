//1 Das html-Element merken
const root = document.documentElement;


//2 Den Knopf merken
const toggle = document.querySelector("#theme-toggle");

//3 Eine Funktion schreiben, die ein Thema anwendet
function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
}

//4 Beim Laden das gespeicherte Thema anwenden
applyTheme(localStorage.getItem("theme") || "dark");

//5 Beim Klick umschalten und speichern
toggle.addEventListener("click", function () {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
});