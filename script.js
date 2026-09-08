document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.querySelector(".today button");
    const planButton = document.querySelector(".plan button");

    let completedDays = Number(localStorage.getItem("milfitCompletedDays")) || 0;

    function updateProgress() {
        const completedText = document.querySelector(".progress p:nth-child(2)");
        const streakText = document.querySelector(".progress p:nth-child(3)");
        const dayText = document.querySelector(".progress p:nth-child(4)");

        if (completedText) {
            completedText.innerHTML =
                "Training days completed: <strong>" + completedDays + "</strong>";
        }

        if (streakText) {
            streakText.innerHTML =
                "Current streak: <strong>" + completedDays + " days</strong>";
        }

        if (dayText) {
            const currentDay = Math.min(completedDays + 1, 180);

            dayText.innerHTML =
                "Day: <strong>" + currentDay + " / 180</strong>";
        }
    }

    if (startButton) {
        startButton.addEventListener("click", function () {

            if (completedDays < 180) {
                completedDays++;

                localStorage.setItem(
                    "milfitCompletedDays",
                    completedDays
                );

                updateProgress();

                alert(
                    "Great work! Day " +
                    completedDays +
                    " completed. Stay consistent and train safely."
                );
            } else {
                alert("Congratulations! You completed all 180 days!");
           