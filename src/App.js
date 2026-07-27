import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <h2>WorkHub</h2>

        <div>
          <Link to="/"><button>Home</button></Link>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
          <Link to="/dashboard"><button>Dashboard</button></Link>
          <Link to="/employees"><button>Employee List</button></Link>
          <Link to="/add-employee"><button>Add Employee</button></Link>
          <Link to="/edit-employee"><button>Edit Employee</button></Link>
          <Link to="/delete-employee"><button>Delete Employee</button></Link>
          <Link to="/logout"><button>Logout</button></Link>
        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee" element={<EditEmployee />} />
        <Route path="/delete-employee" element={<DeleteEmployee />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;