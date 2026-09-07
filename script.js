document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.querySelector(".today button");

    if (startButton) {
        startButton.addEventListener("click", function () {
            alert("Today's workout is ready! Stay consistent and train safely.");
        });
    }

});