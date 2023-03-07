const rolesUrl = '/admin/api/roles';
const formNew = document.getElementById('formNewUser');
const rolesSave = document.getElementById('rolesAllDB');
const showRoles = (rolesDB) => {
    let allRoles = ''
    rolesDB.forEach(role => {
        allRoles +=
            `<option value=${role.id} text=${role.role} name=${role.role}>${role.role.replace("ROLE_", "")}</option>`
    })
    document.getElementById("rolesAllDB").innerHTML = allRoles
}

fetch(rolesUrl)
    .then(response => response.json())
    .then(data => showRoles(data))
    .catch(error => console.log(error))


formNew.addEventListener('submit', addNewUser);

function addNewUser(event) {
    event.preventDefault();
    let newUserRoles = [];
    for (let i = 0; i < rolesSave.options.length; i++) {
        if (rolesSave.options[i].selected) newUserRoles.push({
            id: rolesSave.options[i].value,
            role: rolesSave.options[i].name
        });
    }

    fetch(adminUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: formNew.firstName.value,
            lastname: formNew.lastName.value,
            age: formNew.age.value,
            email: formNew.email.value,
            password: formNew.password.value,
            roles: newUserRoles
        })
    }).then(() => {
        formNew.reset();
        reloadShowUsers();
        $('#nav-admin-tab').click();
    })

}