const linkActivation = document.querySelector("#linkActivation");
const linksContainer = document.querySelector("#linkList");

function bindEvents() {
    linkActivation.addEventListener('click', (event) => {
        if (linksContainer.style.display == "block") {
            linksContainer.style.display = "none";
        }
        else {
            linksContainer.style.display = "block";
        }
    });
}

function main() {
    bindEvents();
}

main();