function displayAgeAndCalendar() {
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