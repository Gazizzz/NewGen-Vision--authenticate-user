class UserService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get username() {
    return this.username;
  }

  get password() {
    return this.password;
  }

  static async authenticate_user(username, password) {
    const response = await fetch("https://examples.com/api/user/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return data.access_token;
  }
}

$("#login").submit(async function (event) {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  try {
    const token = await UserService.authenticate_user(username, password);

    localStorage.setItem("Token", JSON.stringify(token));

    document.location.href = "/home";
  } catch (error) {
    console.log(error);
  }
});
