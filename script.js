document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".product").forEach((product) => {
        product.addEventListener("click", () => {
            const parentCard = product.closest(".inmodal");

            const bg = parentCard.querySelector(".modalBackground");
            const overlay = parentCard.querySelector(".modalOverlay");
            const button = parentCard.querySelector(".closeButton");

            [bg, overlay, button].forEach(el => el?.classList.remove("fadeOut"));
            [bg, overlay, button].forEach(el => el?.classList.remove("hide"));
        });
    });

    const closeModal = (parentCard) => {
        const bg = parentCard.querySelector(".modalBackground");
        const overlay = parentCard.querySelector(".modalOverlay");
        const button = parentCard.querySelector(".closeButton");

        const targets = [bg, overlay, button].filter(Boolean);

        targets.forEach(el => el.classList.add("fadeOut"));

        setTimeout(() => {
            targets.forEach(el => {
                el.classList.add("hide");
                el.classList.remove("fadeOut");
            });
        }, 300);
    };

    document.querySelectorAll(".closeButton").forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(button.closest(".inmodal"));
        });
    });

    document.querySelectorAll(".modalBackground").forEach((bg) => {
        bg.addEventListener("click", () => {
            closeModal(bg.closest(".inmodal"));
        });
    });
});