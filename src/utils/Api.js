const apiUrl = {
    employees: 'https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api'
};

function getManager(managerId) {
    const query = `${apiUrl.employees}?manager=${managerId}`;
    return fetch(query)
        .then(function (response) {
            return response.json();
        });
}

function getManagerEmployees(manager) {
    const managerId = manager.id;
    const query = `${apiUrl.employees}?manager=${managerId}`;
    return fetch(query)
        .then(function (response) {
            return response.json();
        });
}

export {
    getManager,
    getManagerEmployees,
};