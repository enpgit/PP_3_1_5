const userUrl = '/user/api/users';
const showUserInfo = (user) => {

    let userPageInfo = ''
    userPageInfo +=
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role =>" " +  role.role.replace("ROLE_", ""))}</td>
        </tr>`
    document.getElementById("tbody-user").innerHTML = userPageInfo
}

fetch(userUrl)
    .then(response => response.json())
    .then(data => showUserInfo(data))
    .catch(error => console.log(error))