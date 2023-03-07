const userAuth = '/user/api/users';

const authUser = fetch(userAuth)
    .then(response => response.json())
    .catch(error => console.log(error))
authUser.then(user => {
    let roles = ''

    let panelButton = `
            <a class="nav-link active" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-user" aria-selected="false">User</a>
            `

    let userPageInfo =
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => " " + role.role.replace("ROLE_", ""))}</td>
        </tr>`

    user.roles.forEach(role => {
        roles += ' '
        roles += role.role.replace("ROLE_", "")

    })

    document.getElementById("tbody-user").innerHTML = userPageInfo
    document.getElementById("navbar-email").innerHTML = user.email
    document.getElementById("navbar-roles").innerHTML = roles
    document.getElementById("v-pills-tab").innerHTML = panelButton
    document.getElementById("v-pills-user").className = 'tab-pane fade show active';
    document.getElementById("v-pills-admin").className = 'tab-pane fade show';

})