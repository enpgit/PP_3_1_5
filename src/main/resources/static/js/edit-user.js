$('#edit').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    viewEditModal(id);
})

$(async function () {
    editCurrentUser();
});

async function viewEditModal(id) {
    let userEdit = await getUser(id);
    let formEdit = document.getElementById('formEditUser');
    formEdit.id.value = userEdit.id;
    formEdit.firstName.value = userEdit.firstname;
    formEdit.lastName.value = userEdit.lastname;
    formEdit.age.value = userEdit.age
    formEdit.email.value = userEdit.email;
    formEdit.password.value = "";
    console.log(formEdit.password.value)
    $('#rolesEditUser').empty();

    await fetch(rolesUrl)
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userEdit.roles.length; i++) {
                    if (userEdit.roles[i].role === role.role) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.role.substring(5);
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#rolesEditUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })


}

function editCurrentUser() {
    let formEdit = document.getElementById('formEditUser');
    formEdit.addEventListener("submit", function (event) {
        event.preventDefault();
        let editUserRoles = [];
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            if (formEdit.roles.options[i].selected) editUserRoles.push({
                id: formEdit.roles.options[i].value,
                role: formEdit.roles.options[i].name
            });
        }

        fetch(adminUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formEdit.id.value,
                firstname: formEdit.firstName.value,
                lastname: formEdit.lastName.value,
                age: formEdit.age.value,
                email: formEdit.email.value,
                password: formEdit.password.value,
                roles: editUserRoles
            })
        }).then(() => {
            formEdit.reset();
            reloadShowUsers();
            $('#editFormCloseButton').click();
        })
            .catch((error) => {
                alert(error);
            });

    })

}