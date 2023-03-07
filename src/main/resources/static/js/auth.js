const authUrl = '/user/api/users';

const authUser = fetch(authUrl)
    .then(response => response.json())
    .catch(error => console.log(error))
authUser.then(user => {
    let roles = ''
    let panelButton = ''
    user.roles.forEach(role => {
        roles += ' '
        roles += role.role.replace("ROLE_", "")

        if (role.role == 'ROLE_ADMIN') {
            panelButton = `
                <a class="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>
                    <a class="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-user" aria-selected="false">User</a>
                    `
            document.getElementById("v-pills-user").className = 'tab-pane fade show';
            document.getElementById("v-pills-admin").className = 'tab-pane fade show active';
        } else {
            panelButton = `
                <a class="nav-link active" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-user" aria-selected="false">User</a>
                `
            document.getElementById("v-pills-user").className = 'tab-pane fade show active';
            document.getElementById("v-pills-admin").className = 'tab-pane fade show';
        }

    })

    document.getElementById("navbar-email").innerHTML = user.email
    document.getElementById("navbar-roles").innerHTML = roles
    document.getElementById("v-pills-tab").innerHTML = panelButton

})