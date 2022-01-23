// Check if cookies are set, and load the calendar and timer if it is.
window.addEventListener("load", () => {
    let birthdayCookie = getCookie('birthday');
    if (birthdayCookie) {
        Index_DisplayAgeAndCalendar(birthdayCookie);
    }
});

function Index_DisplayAgeAndCalendar(optionalBirthday) {
    let birthday;

    if (optionalBirthday != null) {
        birthday = optionalBirthday;
    }

    if (inputValidation("header__dateInput") != null) {
        birthday = inputValidation("header__dateInput");
        setCookie('birthday', birthday);
    }

    displayAge(birthday, "after__age");
    displayCalendar(birthday, "after", "after__weeks-container");
}

function Age_DisplayAge(optionalBirthday) {
    let birthday;

    if (optionalBirthday != null) {
        birthday = optionalBirthday;
    }

    if (inputValidation("age__dateInput") != null) {
        birthday = inputValidation("age__dateInput");
        setCookie('birthday', birthday);
    }

    // Hide the input and show the age display
    document.getElementById("age").style.display = "none";
    document.getElementById("age__display__parent").style.display = "flex";
    
    // Display the gae in the age__display element
    displayAge(birthday, "age__display");
}

function inputValidation(elementName) {
    let dateEl = document.getElementById(elementName);
    if (!dateEl) {
        return null;
    }

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

// These cookie functions are taken from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function setCookie(name, value) {
    var expires = "";
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=None; Secure";
}

function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
