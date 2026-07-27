function Logout() {
  return (
    <div className="page logout-page">
      <div className="logout-box">
        <h1>You have been logged out</h1>

        <p>
          Thank you for using WorkHub.
        </p>

        <button className="page-button">
          Login Again
        </button>
      </div>
    </div>
  );
}

export default Logout;