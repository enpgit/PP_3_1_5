const adminAuth = '/admin/api/auth';

const authUser = fetch(adminAuth)
    .then(response => response.json())
    .catch(error => console.log(error))

authUser.then(user => {
    let roles = ''
    let panelButton = ''
    user.roles.forEach(role => {
        roles += ' '
        roles += role.role.replace("ROLE_", "")
    })

    if (roles == ' ADMIN USER' || roles == ' USER ADMIN') {
        panelButton = `
        <a class="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>
            <a class="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-user" aria-selected="false">User</a>
            `
        const userUrl = '/user/api/users';
        const showUserInfo = (user) => {

            let userPageInfo = ''
            userPageInfo =
                `<tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => " " + role.role.replace("ROLE_", ""))}</td>
        </tr>`
            document.getElementById("tbody-user").innerHTML = userPageInfo
        }

        fetch(userUrl)
            .then(response => response.json())
            .then(data => showUserInfo(data))
            .catch(error => console.log(error))


    } else {
        panelButton = `
            <a class="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>
            `
    }

    document.getElementById("navbar-email").innerHTML = user.email
    document.getElementById("navbar-roles").innerHTML = roles
    document.getElementById("v-pills-tab").innerHTML = panelButton

})