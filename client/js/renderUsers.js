function renderUsers(user, container) {
    container.innerHTML += `<p>${user.id} (${user.username})</p>`;
}

module.exports = renderUsers;
