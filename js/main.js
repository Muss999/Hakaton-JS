//! users database

let users = [
    {
        name: "User1",
        password: "pass1",
        age: 43,
        isLogin: false,
        id: 1,
        getMessages: [],
        sendMessages: [],
    },
    {
        name: "User2",
        password: "pass2",
        age: 17,
        isLogin: false,
        id: 2,
        getMessages: [],
        sendMessages: [],
    },
    {
        name: "User3",
        password: "pass3",
        age: 28,
        isLogin: false,
        id: 3,
        getMessages: [],
        sendMessages: [],
    },
    {
        name: "User4",
        password: "pass4",
        age: 35,
        isLogin: false,
        id: 4,
        getMessages: [],
        sendMessages: [],
    },
    {
        name: "User5",
        password: "pass5",
        age: 65,
        isLogin: false,
        id: 5,
        getMessages: [],
        sendMessages: [],
    },
];

//! 1 часть  задачи

// !users logic

let inSystem = "";
function changeInSystemUser(userName = "") {
    inSystem = userName;
    let h3 = document.querySelector("h3");
    inSystem
        ? (h3.innerText = `Пользователь: ${inSystem} в системе.`)
        : (h3.innerText = "Нет пользователей в сети");
}

//! registration

function checkUniqueUserName(userName) {
    return users.some((item) => item.name === userName);
}
function checkPasswords(pass, passConfirm) {
    return pass === passConfirm;
}
function createUser() {
    let userName = prompt("Введите свое имя");
    if (checkUniqueUserName(userName)) {
        alert("Пользователь уже существует!");
        return;
    }
    let pass = prompt("Введите пароль");
    let passConfirm = prompt("Потвердите пароль");
    if (!checkPasswords(pass, passConfirm)) {
        alert("Пароль не подошел!");
        return;
    }
    let age = +prompt("Введите свой возраст");
    let userObj = {
        id: Date.now(),
        name: userName,
        password: pass,
        age: age,
        isLogin: false,
        getMessages: [],
        sendMessages: [],
    };
    users.push(userObj);
    console.log(users);
}

//! login

function getUserObj(userName) {
    return users.find((item) => item.name === userName);
}

function checkUserpassword(userName, pass) {
    let user = getUserObj(userName);
    return user.password === pass;
}

function loginUser() {
    let userName = prompt("Введите свое имя");
    if (!checkUniqueUserName(userName)) {
        alert(`Пользователь: ${userName} не найден!`);
        return;
    }
    let pass = prompt("Введите свой пароль");
    if (!checkUserpassword(userName, pass)) {
        alert("Этот пароль не правильный");
        return;
    }
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
    console.log(`Пользователь: ${userName} авторизовался`);
    console.log(users);
}

//! delete acc

function deleteUser() {
    if (!inSystem) {
        alert("Только авторизованные пользователи могут удалить свой аккаунт!");
        return;
    }
    let userName = prompt("Введите свое имя");
    if (!checkUniqueUserName(userName)) {
        alert(`Пользователь: ${userName} не найден!`);
        return;
    }
    let pass = prompt("Введите пароль для удаления аккаунта");
    if (!checkUserpassword(userName, pass)) {
        alert("Этот пароль не правильный");
        return;
    }
    let isId = +prompt("Введите ваш айди");
    users = users.filter((item) => item.id !== isId);
    console.log("Пользователь был удален");
    console.log(users);
}

//! read

function readUsers() {
    let list = document.querySelector("ul");
    list.innerHTML = "";
    for (let i of users) {
        list.innerHTML += `<li>User's name:${i.name}; User's id: ${i.id};<li>`;
    }
}

//!
//! 2 часть задачи
//!

//! send messages

function checkUserId(userSendId) {
    return users.some((item) => item.id == userSendId);
}

function getUserId(userSendId) {
    return users.find((item) => item.id == userSendId);
}

function sendMessage() {
    if (!inSystem) {
        alert("Только авторизованные пользователи могут написать!");
        return;
    }
    let userSendId = prompt(
        "Введите айди пользователя которому хотите написать."
    );
    if (!checkUserId(userSendId)) {
        alert(`Пользователя с таким айди не существует`);
        return;
    }
    let userSendMessage = prompt("Введите сообщение которое хотите написать");
    let messageObjSend = {
        id: Date.now(),
        title: userSendMessage,
        to: userSendId,
    };
    let messageObjGet = {
        id: Date.now(),
        title: userSendMessage,
        from: inSystem,
    };
    let userGet = getUserId(userSendId);
    let userSend = getUserObj(inSystem);

    userSend.sendMessages.push(messageObjSend);
    userGet.getMessages.push(messageObjGet);

    console.log("МАССИВ С СООБЩЕНИЯМИ");
    console.log(users);
}

//! delete messages

//* я как ни пытался но не смог сделать это удаление сообщения
