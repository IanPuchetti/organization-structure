const apiUrl = {
    employees: 'https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api'
};

function getManager(managerId) {
    const query = `${apiUrl.employees}?manager=${managerId}`;
    return fetch(query)
        .then((response) => response.json())
        .catch((error) => {
            throw new Error(error);
        });
}

function getManagerEmployees(manager) {
    const managerId = manager.id;
    const query = `${apiUrl.employees}?manager=${managerId}`;
    return fetch(query)
        .then((response) => response.json())
        .catch((error) => {
            throw new Error(error);
        });
}

export {
    getManager,
    getManagerEmployees,
};