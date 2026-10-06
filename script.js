/* ==============================
   FITTRACK - FINAL JAVASCRIPT
   ============================== */


/* ==============================
   LOCAL STORAGE DATA
   ============================== */

let completedExercises =
    Number(
        localStorage.getItem("completedExercises")
    ) || 0;


let savedBMI =
    localStorage.getItem("bmi") || "";


let savedCalories =
    localStorage.getItem("calories") || "";


let streak =
    Number(
        localStorage.getItem("streak")
    ) || 0;


let lastWorkoutDate =
    localStorage.getItem("lastWorkoutDate");


let workoutDates =
    JSON.parse(
        localStorage.getItem("workoutDates")
    ) || [];


/* ==============================
   WORKOUT DATABASE
   ============================== */

const workouts = {

    Chest: [
        "Push Ups",
        "Bench Press",
        "Incline Bench Press",
        "Chest Fly",
        "Diamond Push Ups"
    ],

    Back: [
        "Pull Ups",
        "Lat Pulldown",
        "Seated Cable Row",
        "Deadlift",
        "T-Bar Row"
    ],

    Legs: [
        "Squats",
        "Lunges",
        "Leg Press",
        "Leg Extensions",
        "Calf Raises"
    ],

    Arms: [
        "Bicep Curls",
        "Hammer Curls",
        "Tricep Dips",
        "Tricep Pushdown",
        "Skull Crushers"
    ],

    Shoulders: [
        "Shoulder Press",
        "Lateral Raises",
        "Front Raises",
        "Reverse Fly",
        "Arnold Press"
    ],

    "Full Body": [
        "Burpees",
        "Mountain Climbers",
        "Jump Squats",
        "Push Ups",
        "Plank"
    ]

};


/* ==============================
   PAGE LOAD
   ============================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateExerciseCount();

        updateDashboard();

        updateWeeklyProgress();

        updateProgressChart();

        updateTimerDisplay();

        loadGoal();

        loadProfile();

        checkLogin();

    }
);


/* ==============================
   DASHBOARD
   ============================== */

function updateDashboard() {

    const dashboardBMI =
        document.getElementById(
            "dashboardBMI"
        );


    const dashboardCalories =
        document.getElementById(
            "dashboardCalories"
        );


    const dashboardWorkouts =
        document.getElementById(
            "dashboardWorkouts"
        );


    const dashboardStreak =
        document.getElementById(
            "dashboardStreak"
        );


    if (dashboardBMI) {

        dashboardBMI.innerText =
            savedBMI || "--";

    }


    if (dashboardCalories) {

        dashboardCalories.innerText =
            savedCalories || "--";

    }


    if (dashboardWorkouts) {

        dashboardWorkouts.innerText =
            completedExercises;

    }


    if (dashboardStreak) {

        dashboardStreak.innerText =
            "🔥 " + streak;

    }

}


/* ==============================
   EXERCISE COUNT
   ============================== */

function updateExerciseCount() {

    const count =
        document.getElementById(
            "exerciseCount"
        );


    if (count) {

        count.innerText =
            completedExercises;

    }

}


/* ==============================
   START WORKOUT
   ============================== */

function startWorkout() {

    document
        .getElementById("workouts")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==============================
   COMPLETE EXERCISE
   ============================== */

function completeExercise(button) {

    if (!button) {
        return;
    }


    if (
        button.innerText.trim() ===
        "Completed ✓"
    ) {

        return;

    }


    completedExercises++;


    localStorage.setItem(
        "completedExercises",
        completedExercises
    );


    button.innerText =
        "Completed ✓";


    button.style.background =
        "#00ff88";


    button.style.color =
        "#000";


    updateExerciseCount();

    updateStreak();

    recordWorkoutDay();

    updateProgressChart();

    updateDashboard();

}


/* ==============================
   BMI CALCULATOR
   ============================== */

function calculateBMI() {

    const height =
        parseFloat(
            document.getElementById(
                "height"
            ).value
        );


    const weight =
        parseFloat(
            document.getElementById(
                "weight"
            ).value
        );


    const result =
        document.getElementById(
            "bmiResult"
        );


    if (
        !height ||
        !weight ||
        height <= 0 ||
        weight <= 0
    ) {

        result.innerText =
            "Please enter valid height and weight.";

        return;

    }


    const heightMeters =
        height / 100;


    const bmi =
        weight /
        (
            heightMeters *
            heightMeters
        );


    const bmiValue =
        bmi.toFixed(1);


    let category;


    if (bmi < 18.5) {

        category =
            "Underweight";

    } else if (bmi < 25) {

        category =
            "Normal";

    } else if (bmi < 30) {

        category =
            "Overweight";

    } else {

        category =
            "Obese";

    }


    result.innerText =
        "Your BMI: " +
        bmiValue +
        " (" +
        category +
        ")";


    savedBMI =
        bmiValue;


    localStorage.setItem(
        "bmi",
        savedBMI
    );


    updateDashboard();

}


/* ==============================
   SHOW WORKOUT
   ============================== */

function showWorkout(type) {

    const display =
        document.getElementById(
            "workoutDisplay"
        );


    if (!display) {
        return;
    }


    const selectedWorkout =
        workouts[type];


    if (!selectedWorkout) {
        return;
    }


    let html = "";


    html +=
        "<h3>" +
        type +
        " Workout</h3>";


    html +=
        "<div class='exercise-list'>";


    selectedWorkout.forEach(
        function (exercise) {

            html += `
                <div class="exercise-row">

                    <span>
                        ${exercise}
                    </span>

                    <button
                        onclick="completeExercise(this)"
                    >
                        Complete
                    </button>

                </div>
            `;

        }
    );


    html +=
        "</div>";


    display.innerHTML =
        html;

}


/* ==============================
   REST TIMER
   ============================== */

let timerInterval =
    null;


let timerSeconds =
    60;


function startTimer() {

    if (
        timerInterval !== null
    ) {

        return;

    }


    timerInterval =
        setInterval(
            function () {

                if (
                    timerSeconds > 0
                ) {

                    timerSeconds--;

                    updateTimerDisplay();

                } else {

                    clearInterval(
                        timerInterval
                    );

                    timerInterval =
                        null;

                    alert(
                        "Rest time is over! 💪"
                    );

                }

            },
            1000
        );

}


function pauseTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval =
        null;

}


function resetTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval =
        null;


    timerSeconds =
        60;


    updateTimerDisplay();

}


function updateTimerDisplay() {

    const timer =
        document.getElementById(
            "timer"
        );


    if (!timer) {
        return;
    }


    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    timer.innerText =
        String(minutes).padStart(
            2,
            "0"
        ) +
        ":" +
        String(seconds).padStart(
            2,
            "0"
        );

}


/* ==============================
   CALORIE CALCULATOR
   ============================== */

function calculateCalories() {

    const age =
        parseFloat(
            document.getElementById(
                "age"
            ).value
        );


    const gender =
        document.getElementById(
            "gender"
        ).value;


    const weight =
        parseFloat(
            document.getElementById(
                "calorieWeight"
            ).value
        );


    const height =
        parseFloat(
            document.getElementById(
                "calorieHeight"
            ).value
        );


    const activity =
        parseFloat(
            document.getElementById(
                "activity"
            ).value
        );


    const result =
        document.getElementById(
            "calorieResult"
        );


    if (
        !age ||
        !weight ||
        !height ||
        !activity ||
        !gender
    ) {

        result.innerText =
            "Please enter all details.";

        return;

    }


    let BMR;


    if (
        gender === "male"
    ) {

        BMR =
            (
                10 * weight
            ) +
            (
                6.25 * height
            ) -
            (
                5 * age
            ) +
            5;

    } else {

        BMR =
            (
                10 * weight
            ) +
            (
                6.25 * height
            ) -
            (
                5 * age
            ) -
            161;

    }


    const calories =
        Math.round(
            BMR * activity
        );


    result.innerText =
        "Daily Calories: " +
        calories +
        " kcal";


    savedCalories =
        calories;


    localStorage.setItem(
        "calories",
        savedCalories
    );


    updateDashboard();

}


/* ==============================
   STREAK SYSTEM
   ============================== */

function updateStreak() {

    const today =
        new Date().toDateString();


    if (!lastWorkoutDate) {

        streak =
            1;

        lastWorkoutDate =
            today;

    }


    else if (
        lastWorkoutDate !== today
    ) {

        const lastDate =
            new Date(
                lastWorkoutDate
            );


        const currentDate =
            new Date(
                today
            );


        const difference =
            Math.floor(
                (
                    currentDate -
                    lastDate
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (
            difference === 1
        ) {

            streak++;

        }


        else if (
            difference > 1
        ) {

            streak =
                1;

        }


        lastWorkoutDate =
            today;

    }


    localStorage.setItem(
        "streak",
        streak
    );


    localStorage.setItem(
        "lastWorkoutDate",
        lastWorkoutDate
    );


    updateDashboard();

}


/* ==============================
   DATE KEY
   ============================== */

function getDateKey(date) {

    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0")
    );

}


/* ==============================
   RECORD WORKOUT DAY
   ============================== */

function recordWorkoutDay() {

    const today =
        getDateKey(
            new Date()
        );


    if (
        !workoutDates.includes(
            today
        )
    ) {

        workoutDates.push(
            today
        );


        localStorage.setItem(
            "workoutDates",
            JSON.stringify(
                workoutDates
            )
        );

    }


    updateWeeklyProgress();

}


/* ==============================
   WEEKLY PROGRESS
   ============================== */

function updateWeeklyProgress() {

    const container =
        document.getElementById(
            "weeklyDays"
        );


    const count =
        document.getElementById(
            "weeklyCount"
        );


    if (
        !container ||
        !count
    ) {

        return;

    }


    container.innerHTML =
        "";


    let completedDays =
        0;


    const dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date();


        date.setDate(
            date.getDate() - i
        );


        const key =
            getDateKey(
                date
            );


        const completed =
            workoutDates.includes(
                key
            );


        if (completed) {

            completedDays++;

        }


        const day =
            document.createElement(
                "div"
            );


        day.className =
            "weekly-day";


        if (completed) {

            day.classList.add(
                "completed"
            );

        }


        day.innerHTML = `

            <span class="day-name">
                ${dayNames[date.getDay()]}
            </span>

            <span class="day-status">
                ${completed ? "✓" : "·"}
            </span>

        `;


        container.appendChild(
            day
        );

    }


    count.innerText =
        completedDays +
        " / 7 days active";

}


/* ==============================
   PROGRESS CHART
   ============================== */

function updateProgressChart() {

    const chart =
        document.getElementById(
            "progressChart"
        );


    if (!chart) {
        return;
    }


    chart.innerHTML =
        "";


    const dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date();


        date.setDate(
            date.getDate() - i
        );


        const key =
            getDateKey(
                date
            );


        const completed =
            workoutDates.includes(
                key
            );


        const workoutCount =
            completed ? 1 : 0;


        const column =
            document.createElement(
                "div"
            );


        column.className =
            "chart-column";


        const value =
            document.createElement(
                "div"
            );


        value.className =
            "chart-value";


        value.innerText =
            workoutCount;


        const bar =
            document.createElement(
                "div"
            );


        bar.className =
            "chart-bar";


        bar.style.height =
            completed
                ? "150px"
                : "5px";


        const day =
            document.createElement(
                "div"
            );


        day.className =
            "chart-day";


        day.innerText =
            dayNames[
                date.getDay()
            ];


        column.appendChild(
            value
        );


        column.appendChild(
            bar
        );


        column.appendChild(
            day
        );


        chart.appendChild(
            column
        );

    }

}


/* ==============================
   PERSONAL GOALS
   ============================== */

function saveGoal() {

    const name =
        document.getElementById(
            "goalName"
        ).value.trim();


    const type =
        document.getElementById(
            "goalType"
        ).value;


    const target =
        parseFloat(
            document.getElementById(
                "goalTarget"
            ).value
        );


    const current =
        parseFloat(
            document.getElementById(
                "goalCurrent"
            ).value
        );


    if (
        !name ||
        !type ||
        isNaN(target) ||
        isNaN(current)
    ) {

        alert(
            "Please enter all goal details."
        );

        return;

    }


    const goal = {

        name: name,

        type: type,

        target: target,

        current: current

    };


    localStorage.setItem(
        "fitnessGoal",
        JSON.stringify(goal)
    );


    displayGoal(
        goal
    );

}


function loadGoal() {

    const savedGoal =
        localStorage.getItem(
            "fitnessGoal"
        );


    if (!savedGoal) {
        return;
    }


    try {

        const goal =
            JSON.parse(
                savedGoal
            );


        displayGoal(
            goal
        );

    } catch (error) {

        console.log(
            "Goal loading error"
        );

    }

}


function displayGoal(goal) {

    const card =
        document.getElementById(
            "goalCard"
        );


    if (!card) {
        return;
    }


    let percentage =
        0;


    if (
        goal.target > 0
    ) {

        percentage =
            (
                goal.current /
                goal.target
            ) *
            100;

    }


    percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    card.innerHTML = `

        <div class="goal-card">

            <h4>
                ${goal.name}
            </h4>

            <p>
                ${goal.type}
            </p>

            <p>
                Current:
                ${goal.current}
            </p>

            <p>
                Target:
                ${goal.target}
            </p>

            <div class="goal-progress">

                <div
                    class="goal-progress-bar"
                    style="width:${percentage}%"
                ></div>

            </div>

            <div class="goal-percent">
                ${percentage.toFixed(0)}% Progress
            </div>

        </div>

    `;

}


/* ==============================
   PROFILE
   ============================== */

function openProfile() {

    const modal =
        document.getElementById(
            "profileModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


function closeProfile() {

    const modal =
        document.getElementById(
            "profileModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


function saveProfile() {

    const name =
        document.getElementById(
            "profileName"
        ).value.trim();


    const email =
        document.getElementById(
            "profileEmail"
        ).value.trim();


    const level =
        document.getElementById(
            "profileLevel"
        ).value;


    const profile = {

        name: name,

        email: email,

        level: level

    };


    localStorage.setItem(
        "fittrackProfile",
        JSON.stringify(profile)
    );


    alert(
        "Profile saved successfully! ✅"
    );


    closeProfile();

}


function loadProfile() {

    const saved =
        localStorage.getItem(
            "fittrackProfile"
        );


    if (!saved) {
        return;
    }


    try {

        const profile =
            JSON.parse(
                saved
            );


        document.getElementById(
            "profileName"
        ).value =
            profile.name || "";


        document.getElementById(
            "profileEmail"
        ).value =
            profile.email || "";


        document.getElementById(
            "profileLevel"
        ).value =
            profile.level ||
            "Beginner";


    } catch (error) {

        console.log(
            "Profile loading error"
        );

    }

}


/* ==============================
   LOGIN
   ============================== */

function loginUser() {

    const name =
        document.getElementById(
            "loginName"
        ).value.trim();


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    if (
        !name ||
        !email ||
        !password
    ) {

        alert(
            "Please fill in all login details."
        );

        return;

    }


    const user = {

        name: name,

        email: email

    };


    localStorage.setItem(
        "fittrackUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "isLoggedIn",
        "true"
    );


    localStorage.setItem(
        "fittrackProfile",
        JSON.stringify({
            name: name,
            email: email,
            level: "Beginner"
        })
    );


    document.getElementById(
        "loginModal"
    ).classList.remove(
        "show"
    );


    loadProfile();


    alert(
        "Welcome to FitTrack, " +
        name +
        "! 💪"
    );

}


function checkLogin() {

    const loggedIn =
        localStorage.getItem(
            "isLoggedIn"
        );


    if (!loggedIn) {

        const loginModal =
            document.getElementById(
                "loginModal"
            );


        if (loginModal) {

            loginModal.classList.add(
                "show"
            );

        }

    }

}


function logoutUser() {

    localStorage.removeItem(
        "isLoggedIn"
    );


    alert(
        "You have been logged out."
    );


    closeProfile();


    const loginModal =
        document.getElementById(
            "loginModal"
        );


    if (loginModal) {

        loginModal.classList.add(
            "show"
        );

    }

}


/* ==============================
   MOBILE MENU
   ============================== */

function toggleMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (menu) {

        menu.classList.toggle(
            "show"
        );

    }

}


function closeMobileMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (menu) {

        menu.classList.remove(
            "show"
        );

    }

}


/* ==============================
   CLOSE MODAL BY CLICKING OUTSIDE
   ============================== */

window.addEventListener(
    "click",
    function (event) {

        const profileModal =
            document.getElementById(
                "profileModal"
            );


        if (
            event.target ===
            profileModal
        ) {

            closeProfile();

        }

    }
);