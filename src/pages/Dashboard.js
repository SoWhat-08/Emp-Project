function Dashboard() {
  return (
    <div className="page dashboard-page">
      <div className="dashboard-content">
        <h1>WorkHub Dashboard</h1>

        <p>Welcome to your employee management dashboard.</p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h2>50</h2>
            <p>Total Employees</p>
          </div>

          <div className="dashboard-card">
            <h2>45</h2>
            <p>Active Employees</p>
          </div>

          <div className="dashboard-card">
            <h2>5</h2>
            <p>On Leave</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;