document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.querySelector(".today button");
    const planButton = document.querySelector(".plan button");

    let completedDays =
        Number(localStorage.getItem("milfitCompletedDays")) || 0;

    let usedChallenges =
        JSON.parse(localStorage.getItem("milfitUsedChallenges")) || [];

    const challenges = [
        "Complete 10 minutes of easy movement without stopping.",
        "Do 3 rounds of: 8 squats, 6 incline push-ups, 20-second plank.",
        "Take a 20-minute brisk walk and finish with 5 minutes of mobility.",
        "Do 3 rounds of: 10 squats, 8 wall push-ups, 10 reverse lunges.",
        "Complete 5 minutes of gentle mobility after your normal workout.",
        "Do 4 rounds of: 8 squats, 6 incline push-ups, 20-second plank.",
        "Walk or jog easily for 15 minutes, then cool down.",
        "Complete 3 rounds of 8 squats and 8 incline push-ups.",
        "Do 10 minutes of mobility focusing on hips, ankles and shoulders.",
        "Complete a 20-minute easy walk at a steady pace."
    ];

    /*
      The challenge system can safely create 150 challenge slots
      from the challenge library above.
    */

    for (let i = challenges.length; i < 150; i++) {
        challenges.push(
            challenges[i % 10] +
            " — Challenge #" + (i + 1)
        );
    }

    function getCurrentDay() {
        return Math.min(completedDays + 1, 180);
    }

    function updateProgress() {

        const progress =
            document.querySelector(".progress");

        if (!progress) return;

        progress.innerHTML = `
            <h2>Your Progress</h2>
            <p>Training days completed:
                <strong>${completedDays}</strong>
            </p>
            <p>Current streak:
                <strong>${completedDays} days</strong>
            </p>
            <p>Day:
                <strong>${getCurrentDay()} / 180</strong>
            </p>
        `;
    }

    function showTodayWorkout() {

        const day = getCurrentDay();

        const workout = getWorkout(day);

        alert(
            "MILFIT — DAY " + day + "\n\n" +
            workout
        );
    }

    function getWorkout(day) {

        if (day % 7 === 0) {
            return (
                "RECOVERY & MOBILITY DAY\n\n" +
                "• 20–30 min easy walking\n" +
                "• Gentle full-body mobility\n" +
                "• Light stretching\n" +
                "• Hydrate and recover\n\n" +
                "Recovery is part of training."
            );
        }

        const level = Math.ceil(day / 30);

        if (level === 1) {
            return (
                "FOUNDATION\n\n" +
                "• Warm-up — 5 min\n" +
                "• Easy walk/jog — 15 min\n" +
                "• Squats — 3 × 8\n" +
                "• Incline push-ups — 3 × 6\n" +
                "• Plank — 3 × 20 sec\n" +
                "• Cool-down — 5 min"
            );
        }

        if (level === 2) {
            return (
                "ENDURANCE\n\n" +
                "• Warm-up — 5–7 min\n" +
                "• Brisk walk/easy jog — 20 min\n" +
                "• Squats — 3 × 10\n" +
                "• Incline push-ups — 3 × 8\n" +
                "• Plank — 3 × 25 sec\n" +
                "• Cool-down — 5 min"
            );
        }

        if (level === 3) {
            return (
                "STRENGTH FOUNDATION\n\n" +
                "• Warm-up — 7 min\n" +
                "• Easy cardio — 20 min\n" +
                "• Squats — 3 × 12\n" +
                "• Push-up variation — 3 × 8\n" +
                "• Reverse lunges — 2 × 8 each side\n" +
                "• Plank — 3 × 30 sec\n" +
                "• Cool-down"
            );
        }

        if (level === 4) {
            return (
                "CONDITIONING\n\n" +
                "• Warm-up — 7 min\n" +
                "• Cardio — 20–25 min\n" +
                "• Squats — 3 × 12\n" +
                "• Push-up variation — 3 × 10\n" +
                "• Reverse lunges — 3 × 8 each side\n" +
                "• Plank — 3 × 30 sec\n" +
                "• Mobility — 5 min"
            );
        }

        if (level === 5) {
            return (
                "PERFORMANCE\n\n" +
                "• Warm-up — 8 min\n" +
                "• Cardio — 25 min\n" +
                "• Squats — 3 × 15\n" +
                "• Push-up variation — 3 × 10\n" +
                "• Lunges — 3 × 10 each side\n" +
                "• Plank — 3 × 35 sec\n" +
                "• Cool-down"
            );
        }

        return (
            "FINAL PREPARATION\n\n" +
            "• Warm-up — 8 min\n" +
            "• Steady cardio — 25–30 min\n" +
            "• Controlled bodyweight circuit\n" +
            "• Core stability work\n" +
            "• Full mobility cool-down\n\n" +
            "Focus on technique, consistency and recovery."
        );
    }

    function showFullPlan() {

        let plan = "MILFIT — 180 DAY PLAN\n\n";

        for (let month = 1; month <= 6; month++) {

            const start = (month - 1) * 30 + 1;
            const end = month * 30;

            const names = [
                "Foundation",
                "Endurance",
                "Strength",
                "Conditioning",
                "Performance",
                "Final Preparation"
            ];

            plan +=
                "MONTH " + month +
                " — " + names[month - 1] +
                "\nDays " + start + "–" + end +
                "\n\n";
        }

        plan +=
            "Every 7th day is a recovery-focused day.\n" +
            "Open Today's Training for the workout.";

        alert(plan);
    }

    function giveChallenge() {

        if (usedChallenges.length >= 150) {
            usedChallenges = [];
            localStorage.setItem(
                "milfitUsedChallenges",
                JSON.stringify(usedChallenges)
            );
        }

        let available = [];

        for (let i = 0; i < 150; i++) {
            if (!usedChallenges.includes(i)) {
                available.push(i);
            }
        }

        const randomIndex =
            available[Math.floor(Math.random() * available.length)];

        usedChallenges.push(randomIndex);

        localStorage.setItem(
            "milfitUsedChallenges",
            JSON.stringify(usedChallenges)
        );

        alert(
            "🎯 TODAY'S CHALLENGE\n\n" +
            challenges[randomIndex] +
            "\n\nChallenge " +
            (usedChallenges.length) +
            " / 150"
        );
    }

    if (startButton) {
        startButton.addEventListener("click", function () {

            showTodayWorkout();

            if (completedDays < 180) {
                completedDays++;

                localStorage.setItem(
                    "milfitCompletedDays",
                    completedDays
                );

                updateProgress();
            }
        });
    }

    if (planButton) {
        planButton.addEventListener(
            "click",
            showFullPlan
        );
    }

    /*
      Add Challenge button automatically.
    */

    const challengeButton =
        document.createElement("button");

    challengeButton.textContent =
        "🎯 Give Me a Challenge";

    challengeButton.addEventListener(
        "click",
        giveChallenge
    );

    const todaySection =
        document.querySelector(".today");

    if (todaySection) {
        todaySection.appendChild(challengeButton);
    }

    updateProgress();

});