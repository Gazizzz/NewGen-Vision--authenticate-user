// fetch(
//   "https://jsonplaceholder.typicode.com/users",

//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify({ name: "Mary", ss: "ss" }),
//   }
// )
//   .then((res) => res.json())
//   .then((data) => console.log(JSON.stringify(data)));

// async function test1(name, kek) {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "POST",
//     body: JSON.stringify({ name: name, ss: kek }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   console.log(response.text());
// }
// test1("sasha", 21);
username;
password;

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
    const response = await fetch("http://localhost:3000/auth/login", {
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

  static async loadProfile(token) {
    const response = await fetch("http://localhost:3000/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  }
}

$("#login").submit(async function (event) {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  try {
    const token = await UserService.authenticate_user(username, password);
    const userData = await UserService.loadProfile(token);

    localStorage.setItem("Token", JSON.stringify(userData));

    document.location.href = "/profile.html";
  } catch (error) {
    console.log(error);
  }
});

// 1. Добавить страницу profile.
// 2. На странице profile.html загрузить данные пользователя и вывести в консоль
