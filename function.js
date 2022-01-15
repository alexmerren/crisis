function Index_DisplayAgeAndCalendar() {
    // Perform input validation and get birthday
    birthday = inputValidation("header__dateInput");
    if (birthday == null) {
        return;
    }
    displayAge(birthday, "after__age")
    displayCalendar(birthday, "after", "after__weeks-container")
}

function Age_DisplayAge() {
    // Perform input validation and get birthday
    birthday = inputValidation("age__dateInput");
    if (birthday == null) {
        return;
    }

    // Hide the input and show the age display
    document.getElementById("age").style.display = "none";
    document.getElementById("age__display__parent").style.display = "flex";
    
    // Display the gae in the age__display element
    displayAge(birthday, "age__display")
}

function inputValidation(elementName) {
    let dateEl = document.getElementById(elementName);
    let birthday = new Date(dateEl.value);
    if (isNaN(birthday)) {
        return null;
    }
    return birthday;
}

function displayAge(birthday, elementName) {
    // Get the reference for the specified element, and constantly refresh the number
    let ageEl = document.getElementById(elementName);
    setInterval(() => {
        let time = dayjs().diff(dayjs(birthday), 'year', true);
        ageEl.innerText = time.toString().substring(0, 12);
    }, 50);
}

function displayCalendar(birthday, parentElement, element) {
    document.getElementById(parentElement).style.display = "flex";
    let currentAge = dayjs().diff(dayjs(birthday), 'year', true);
    let currentAgeInWeeks = currentAge * 52;
    let totalWeeksInLife = 71 * 52;
    for (let i = 0; i < totalWeeksInLife; ++i) {
        if (i % 52 == 0) {
            document.getElementById(element).appendChild(document.createElement("br"));
            let number = document.createElement("p");
            number.innerHTML = i / 52;
            document.getElementById(element).appendChild(number);
        }

        let weekDiv = document.createElement("div");
        if (i < currentAgeInWeeks) {
            weekDiv.style.backgroundColor = "black";
        }

        if (i === Math.floor(currentAgeInWeeks)) {
            weekDiv.style.backgroundColor = "#E26D5A";
            weekDiv.style.border = "1px #E26D5A solid";
        }

        document.getElementById(element).appendChild(weekDiv);
    }
}

