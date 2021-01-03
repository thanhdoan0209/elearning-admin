
$(function () {
    $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
    });
});

function popUpDeleteUser(username) {
    console.log(username)
    const data = {
        username: username
    }
    var r = confirm("Do you want to delete a user ?");
    if (r == true) {
        $.ajax({
            url: "/users/user-detail/delete/" + username,
            method: "DELETE",
            data: data,
            success: (res) => {
                console.log(res)
                alert(res)
                document.getElementById(username).remove();
                document.getElementById("teacher-" + username).remove();
                document.getElementById("admin-" + username).remove();
            }
        })
    } else {
    }
};


function setTeacher(username) {
    console.log(username)
    const data = {
        username: username
    }
    var r = confirm("Do you want to set teacher for user ?");
    if (r == true) {
        $.ajax({
            url: "/users/user-detail/set-teacher/" + username,
            method: "post",
            data: data,
            success: (res) => {
                console.log(res)
                if (res != "User had been teacher") {
                    $('#teachersList').prepend(
                        "<tr id='teacher-" + res.username + "'>\
								<td> " + res.email + " </td>\
								<td><a href='/users/user-detail/" + res.username + "'>\
									" + res.username + "</a></td>\
								<td> " + res.firstName + " </td>\
								<td> " + res.lastName + " </td>\
								<td> " + res.phone + " </td>\
								<td> " + res.address + " </td>\
								<td> <button type='button' class='btn btn-sm dropdown-toggle' \
									data-toggle='dropdown' data-offset='-52' aria-expanded='false'>\
									<i class='fas fa-bars'></i> \
									</button> <div class='dropdown-menu' role='menu'> \
									<a onclick='unsetTeacher('" + res.username + "')'\
										class='dropdown-item'>Unset Teacher</a>\
									<a href='/users/user-detail/edit/" + res.username + "'\
										class='dropdown-item'>Edit user</a>\
									<a onclick='popUpDeleteUser('" + res.username + "')'\
										class='dropdown-item'>Delete user</a></div></td></tr>"
                    )
                    alert("Set teacher for user " + res.username + " successfully");
                } else
                    alert(res)
            }
        })
    }
};


function setAdmin(username) {
    console.log(username)
    const data = {
        username: username
    }
    var r = confirm("Do you want to set admin for user ?");
    if (r == true) {
        $.ajax({
            url: "/users/user-detail/set-admin/" + username,
            method: "post",
            data: data,
            success: (res) => {
                console.log(res)
                if (res != "User had been admin") {
                    $('#adminList').prepend(
                        "<tr id='admin-" + res.username + "'>\
								<td> " + res.email + " </td>\
								<td><a href='/users/user-detail/" + res.username + "'>\
									" + res.username + "</a></td>\
								<td> " + res.firstName + " </td>\
								<td> " + res.lastName + " </td>\
								<td> " + res.phone + " </td>\
								<td> " + res.address + " </td>\
								<td> <button type='button' class='btn btn-sm dropdown-toggle' \
									data-toggle='dropdown' data-offset='-52' aria-expanded='false'>\
									<i class='fas fa-bars'></i> \
									</button> <div class='dropdown-menu' role='menu'> \
									<a onclick='unsetAdmin('" + res.username + "')'\
										class='dropdown-item'>Unset Admin</a>\
									<a href='/users/user-detail/edit/" + res.username + "'\
										class='dropdown-item'>Edit user</a>\
									<a onclick='popUpDeleteUser('" + res.username + "')'\
										class='dropdown-item'>Delete user</a></div></td></tr>"
                    )
                    alert("Set admin for user " + username + " successfully");
                } else
                    alert(res)
            }
        })
    }
};


function unsetTeacher(username) {
    console.log(username)
    const data = {
        username: username
    }
    var r = confirm("Do you want to unset teacher for user ?");
    if (r == true) {
        $.ajax({
            url: "/users/user-detail/unset-teacher/" + username,
            method: "post",
            data: data,
            success: (res) => {
                console.log(res)
                alert(res);
                document.getElementById("teacher-" + username).remove();
            }
        })
    } else {
    }
};


function unsetAdmin(username) {
    console.log(username)
    const data = {
        username: username
    }
    var r = confirm("Do you want to unset admin for user ?");
    if (r == true) {
        $.ajax({
            url: "/users/user-detail/unset-admin/" + username,
            method: "post",
            data: data,
            success: (res) => {
                console.log(res)
                alert(res);
                document.getElementById("admin-" + username).remove();
            }
        })
    } else {
    }
};
