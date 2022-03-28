var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

window.addEventListener("load", () => {
  let birthday = urlParams.get('birthday');
  if (birthday == null) { return; }
  if (window.location.href.match('index') != null) {
    Index_DisplayAgeAndCalendar(birthday);
  }
  if (window.location.href.match('age') != null) {
    Age_DisplayAge(birthday);
  }
});

function Index_DisplayAgeAndCalendar(birthday) {
  if (inputValidation("header__dateInput") != null) {
    birthday = inputValidation("header__dateInput");
  }

  if (urlParams.get("birthday") != birthday) {
    birthday = dayjs(birthday, "YYYY MM DD");
    urlParams.set("birthday", birthday);
    document.location.search = urlParams.toString();
  }

  displayAge(birthday, "after__age");
  displayLink(birthday, "after__link");
  displayCalendar(birthday, "after", "after__weeks-container");
}

function Age_DisplayAge(birthday) {
  if (inputValidation("age__dateInput") != null) {
    birthday = inputValidation("age__dateInput");
  }

  // Hide the input and show the age display
  document.getElementById("age").style.display = "none";
  document.getElementById("age__display__parent").style.display = "flex";
  
  if (urlParams.get("birthday") != birthday) {
    birthday = dayjs(birthday, "YYYY MM DD");
    urlParams.set("birthday", birthday);
    document.location.search = urlParams.toString();
  }

  // Display the age__display element
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

function displayCalendar(birthday, parentElement, calendarElement) {
  document.getElementById(parentElement).style.display = "flex";
  let currentAge = dayjs().diff(dayjs(birthday), 'year', true);
  let currentAgeInWeeks = currentAge * 52;
  let totalWeeksInLife = 82 * 52;
  for (let i = 0; i < totalWeeksInLife; ++i) {
    // Create the number at the left of the row, and append a break so that it
    // goes to the next line.
    if (i % 52 == 0) {
      document.getElementById(calendarElement).appendChild(document.createElement("br"));
      let number = document.createElement("p");
      number.innerHTML = i / 52;
      document.getElementById(calendarElement).appendChild(number);
    }

    // Create the dot and decide which background color it should have.
    let weekDiv = document.createElement("div");
    if (i < currentAgeInWeeks) {
      weekDiv.style.backgroundColor = "black";
    }
    if (i === Math.floor(currentAgeInWeeks)) {
      weekDiv.style.backgroundColor = "#E26D5A";
      weekDiv.style.border = "1px #E26D5A solid";
    }

    document.getElementById(calendarElement).appendChild(weekDiv);
  }
}

function displayLink(birthday, element) {}
