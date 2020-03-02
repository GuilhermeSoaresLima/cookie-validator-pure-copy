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

  state.showCookie = false;

  document.location.reload(true);
}

function checkCookies() {
  const lastCookie = document.cookie
    .split(";")
    .filter(row => row.includes("expirationDate"));

  return getLastCookie(lastCookie);
}

function compareDate() {
  const dayToTimesTamp = 24 * 60 * 60 * 1000;
  const lastCookie = checkCookies();
  const lastCookieToTimestamp = new Date(`${lastCookie.hour}`);
  const currentTime = new Date();

  if (
    currentTime.getTime() >= lastCookieToTimestamp.getTime() + dayToTimesTamp ||
    lastCookie.name === ""
  ) {
    return true;
  }

  return false;
}

function closeMessage(isOpen) {
  console.log(isOpen);
  if (isOpen) {
    createNewCookie();
  }
}

function genericFunction() {
  closeMessage(state.showCookie);
}

// Beginning of the running

state.showCookie = compareDate();

window.addEventListener("load", function() {
  if (state.showCookie === false) {
    document.getElementById("isView").style.display = "none";
  }
});
