const adminUrl = '/admin/api/users';

let usersInfo = ''
const showUsers = (users) => {
    const arr = Array.from(users)
    arr.forEach(user => {
        usersInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role =>" " +  role.role.replace("ROLE_", ""))}</td>
            <td>
                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                    data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                    data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
            </td>
        </tr>
        `
    })
    document.getElementById("tbody-allusers").innerHTML = usersInfo
}

fetch(adminUrl)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(adminUrl)
        .then(response => response.json())
        .then(data => {
            usersInfo = ''
            showUsers(data)
        })
}
