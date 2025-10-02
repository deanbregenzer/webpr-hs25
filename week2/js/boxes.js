const rotateButton = document.querySelector('.rotate-btn')
const colorAnimationButton = document.querySelector('.color-animation')


    rotateButton.addEventListener('click', (event) => {
        event.stopPropagation();
        // Find the closest parent container
        const container = rotateButton.closest('.box');
        // Find the box inside that container
        // Toggle the rotation class on that box only
        container.classList.toggle('rotate');
});
colorAnimationButton.addEventListener('click', (event) => {
    event.stopPropagation();
    // Find the closest parent container
    const container = colorAnimationButton.closest('.box');
    // Find the box inside that container
    // Toggle the rotation class on that box only
    container.classList.toggle('rainbow');
});