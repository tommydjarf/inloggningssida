/*
  Här lägger jag in värdena i loval.Storage och skapar två
  variabler så jag kan använda värdena i mina funktioner.
*/
localStorage.setItem("username", "Bella");
localStorage.setItem("password", "qwe123");
let storedUsername = localStorage.getItem("username");
let storedPassword = localStorage.getItem("password");

/* 
  Funktion för att logga in. Först skapar jag två variabler
  som jag får ifrån input fälten från användaren. Sen körs en if 
  sats där jag kontrollerar om det som är inskrivet är korrekt emot
  dom värdens om finns sparade i local.Storage. Om det är korrekt så
  sätter jag en ny nyckel i local.Storage för att kunna veta om
  användaren är inloggad eller inte.  Sen sätter jag mina olika divs 
  från HTML dokumentet till att visa rätt sida. Skriver även ut Bellas namn.
  Om användaren skriver fel uppgifter så printas ett meddelande ut
  i en p-tag.
*/
function login() {
  let usernameInput = GetElementById("username").value;
  let passwordInput = GetElementById("password").value;

  if (usernameInput === storedUsername && passwordInput === storedPassword) {
    localStorage.setItem("loggedIn", "true");
    ShowElement("login-container", false);
    ShowElement("loggedin-container", true);
    ShowElement("error", false);
    GetElementById("loggedin").innerHTML = "Välkommen " + storedUsername;
  } else {
    ShowElement("error", true);
    GetElementById("error").innerHTML = "<p>Fel användarnamn och lösenord.</p>";
  }  
}

// Eventlyssnare för att användaren ska kunna trycka Enter för att logga in.
addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    login();
  }
});

/*
  Här kontrollerar jag när sidan laddas om värdet loggedIn ligger 
  kvar i local.Storage om värdet gör det så loggas användaren in 
  direkt när sidan laddas.
*/
window.onload = function () {
  let loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    ShowElement("login-container", false);
    ShowElement("loggedin-container", true);
    GetElementById("loggedin").innerHTML = "Välkommen " + storedUsername;
  } else {
    ShowElement("login-container", true);
    ShowElement("loggedin-container", false);
  }
};

/*
  En funktion för när användaren loggar ut. 
  Värdet som jag sparat i local.Storage sätts till false
  Kör även en window.location.reload för att det som skrivits in av 
  användaren i input fälten inte ska ligga kvar.
*/
function logout() {
  localStorage.setItem("loggedIn", "false");
  ShowElement("login-container", true);
  ShowElement("loggedin-container", false);
  window.location.reload();
}

// Funktion för att korta ner återkommande saker i tidigare funktioner
function GetElementById(elementId) {
  return document.getElementById(elementId);
}

/* 
  En till funktion för att korta ner återkommande saker i tidigare funktioner.
  Fungerar som en bool, om showEement = true så sätts värdet till flex, vid
  false så döljs det.
*/
function ShowElement(elementId, show) {
  let showElement = "none";
  if (show) {
    showElement = "flex";
  }
  GetElementById(elementId).style.display = showElement;
}
