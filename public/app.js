import TokenState from './tokenState.js';

const pingButton = document.getElementById('pingButton');
pingButton.disabled = false;

let myToken;

pingButton.addEventListener('click', async () => {
  pingButton.disabled = true;

  const name = prompt("Enter your name:");
  myToken = TokenState.setToken(name);
  await TokenState.putToken(myToken);

  const poll = setInterval(async () => {
    const serverToken = await TokenState.getToken();
    if (!serverToken) return;

    if (serverToken.browser !== myToken.browser) {
      clearInterval(poll);
      alert("Ping received! Now it's your turn again.");
      pingButton.disabled = false;
    }
  }, 1000);
});