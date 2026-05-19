const loadingStart = Date.now();

window.addEventListener("load", function () {
    const elapsed = Date.now() - loadingStart;
    const minTime = 1000;

    if (elapsed < minTime) {
        setTimeout(() => {
            loaded();
        }, minTime - elapsed);
    } else {
        loaded();
    }

    initImageLoadEvents();
    resizeGridItems();
});

function loaded() {
    const duration = 5000;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = easeInOut(progress);

        document.getElementsByClassName("loadingProgress")[0]
            .textContent = `${Math.floor(eased * 100)}%`;

        document.getElementsByClassName("loadingLogo")[0]
            .style.setProperty("--progress", 1000 - eased * 160);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            document.getElementsByClassName("loader")[0]
                .classList.add("loadingFadeOut");

            document.getElementsByClassName("mainContent")[0]
                .style.display = "block";

            setTimeout(() => {
                document.getElementsByClassName("loader")[0]
                    .style.display = "none";
            }, 1000);
        }
    }
    requestAnimationFrame(update);
}

function easeInOut(t) {
    return 0.5 * (1 - Math.cos(Math.PI * t));
}

function resizeGridItems() {
    const grid = document.querySelector(".images");
    const rowHeight = 10;
    const rowGap = 16;

    if (!grid) return;

    grid.style.gridAutoRows = rowHeight + "px";

    const items = document.querySelectorAll(".image");

    items.forEach(item => {
        const img = item.querySelector("img");
        if (!img) return;

        const height = img.offsetHeight;
        if (height === 0) return;

        const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = "span " + rowSpan;
    });
}

function initImageLoadEvents() {
    const images = document.querySelectorAll(".image img");

    images.forEach(img => {
        if (img.complete) {
            setTimeout(resizeGridItems, 50);
        } else {
            img.onload = () => {
                setTimeout(resizeGridItems, 50);
            };
        }
    });
}

window.addEventListener("resize", () => {
    resizeGridItems();
});

document.addEventListener("scroll", () => {
    console.log(window.scrollY);
});