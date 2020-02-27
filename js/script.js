let state = {
  showCookie: false
};

function getLastCookie(cookie) {
  if (cookie.length > 0) {
    const lastCookie = cookie[0].split("=");

    return {
      name: lastCookie[0].trim(),
      hour: lastCookie[1]
    };
  }

  return {
    name: "",
    hour: ""
  };
}

function createNewCookie() {
  const currentCookieDate = new Date();
  const expirationDate = new Date(
    currentCookieDate.getTime() + 24 * 60 * 60 * 1000
  );
  document.cookie = `expirationDate=${expirationDate}; expires=${expirationDate};`;

  //   state = {
  //     showCookie: false
  //   };

  state.showCookie = false;
}

function checkCookies() {
  const lastCookie = document.cookie
    .split(";")
    .filter(row => row.includes("expirationDate"));
  console.log(getLastCookie(lastCookie));

  return getLastCookie(lastCookie);
}

function compareDate() {
  const dayToTimesTamp = 24 * 60 * 60 * 1000;
  const lastCookie = checkCookies();
  const lastCookieToTimestamp = new Date(`${lastCookie.hour}`);
  const currentTime = new Date();
  console.log("Timestamp", lastCookieToTimestamp.getTime());

  if (
    currentTime.getTime() >= lastCookieToTimestamp.getTime() + dayToTimesTamp ||
    lastCookie.name === ""
  ) {
    console.log("cookie expirou");
    return true;
  }

  console.log("cookie nao expirou");
  return false;
}

function closeMessage(isOpen) {
  console.log(isOpen);
  if (isOpen) {
    createNewCookie();
  }
}

function showAlert(isView) {
  if (isView === false) {
    document.getElementById("main-container").style.visibility = "hidden";

    console.log(document.getElementById("main-container"));
  }
}

function genericFunction() {
  closeMessage(state.showCookie);
}

state.showCookie = compareDate();

console.log("Estado", state);

showAlert(state.showCookie);
