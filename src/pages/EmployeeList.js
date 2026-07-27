function EmployeeList() {
  const employees = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      department: 'IT',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      department: 'HR',
    },
    {
      id: 3,
      name: 'David Brown',
      email: 'david@example.com',
      department: 'Finance',
    },
  ];

  return (
    <div className="page employee-list-page">
      <div className="employee-list-box">
        <h1>Employee List</h1>

        <p>View all employees in WorkHub.</p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;