$('#delete').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    viewDeleteModal(id);
})

async function viewDeleteModal(id) {
    let userDelete = await getUser(id);
    let formDelete = document.getElementById('formDeleteUser');
    formDelete.id.value = userDelete.id;
    formDelete.firstName.value = userDelete.firstname;
    formDelete.lastName.value = userDelete.lastname;
    formDelete.age.value = userDelete.age
    formDelete.email.value = userDelete.email;

    $('#rolesDeleteUser').empty();

    await fetch(rolesUrl)
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userDelete.roles.length; i++) {
                    if (userDelete.roles[i].role === role.role) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.role.substring(5);
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#rolesDeleteUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })

    formDelete.addEventListener("submit", function (event) {
        event.preventDefault();
        fetch(adminUrl + "/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                $('#deleteFormCloseButton').click();
                reloadShowUsers();
            })
            .catch((error) => {
                alert(error);
            });
    })
}

async function getUser(id) {
    let url = adminUrl + "/" + id;
    let response = await fetch(url);
    return await response.json();
}