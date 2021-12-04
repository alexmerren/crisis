function displayAgeAndCalendar() {
    // Perform input validation for age input.
    let dateEl = document.getElementById("header__dateInput");
    let birthday = new Date(dateEl.value);
    if (isNaN(birthday)) {
        return;
    }
    displayAge(birthday);
    displayCalendar(birthday);
}

function displayAge(birthday) {
    let ageEl = document.getElementById("after__age");
    setInterval(() => {
        let time = dayjs().diff(dayjs(birthday), 'year', true);
        ageEl.innerText = time.toString().substring(0, 12);
    }, 50);
}
function displayCalendar(birthday) {
    document.getElementById("after").style.display = "flex";
    let currentAge = dayjs().diff(dayjs(birthday), 'year', true);
    let currentAgeInWeeks = currentAge * 52;
    let totalWeeksInLife = 80 * 52;
    for (let i = 0; i < totalWeeksInLife; ++i) {
        if (i % 52 == 0) {
            document.getElementById("after__weeks-container").appendChild(document.createElement("br"));
        }
        let weekDiv = document.createElement("div");
        if (i < currentAgeInWeeks) {
            weekDiv.style.backgroundColor = "black";
        }
        if (i == currentAgeInWeeks) {
            weekDiv.style.backgroundColor = "#E26D5A";
        }
        document.getElementById("after__weeks-container").appendChild(weekDiv);
    }
}

function displayAgeOnAgePage() {
    // Get the birthday from the input provided.
    let dateEl = document.getElementById("age__dateInput");
    let birthday = new Date(dateEl.value);
    if (isNaN(birthday)) {
        return;
    }
    
    // Hide the input and show the age display.
    document.getElementById("age").style.display = "none";
    document.getElementById("age__display__parent").style.display = "flex";
    
    // Increment the age every 50 milliseconds.
    let ageEl = document.getElementById("age__display");
    setInterval(() => {
        let time = dayjs().diff(dayjs(birthday), 'year', true);
        ageEl.innerText = time.toString().substring(0, 12);
        document.title = time.toString().substring(0, 12);
    }, 50);
}