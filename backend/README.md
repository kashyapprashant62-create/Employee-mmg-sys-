# Employee Management System — Backend

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure .env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_management
JWT_SECRET=your_super_secret_key_change_this
```

### 3. Start server
```bash
# Development
npm run dev

# Production
npm start
```

## API Routes

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET | /users | Get all users |
| POST | /users | Signup (create user) |
| POST | /users/login | Login (returns JWT token) |

### Employees
| Method | Route | Description |
|--------|-------|-------------|
| GET | /employee?_page=1&_per_page=5 | Get all employees (paginated) |
| GET | /employee/:id | Get single employee |
| POST | /employee | Create employee |
| PUT | /employee/:id | Update employee |
| DELETE | /employee/:id | Delete employee |

## Frontend Change Required

In your frontend, the login currently fetches all users and compares.
For better security, update `LoginPage.jsx` to use the login API:

```js
// Replace the useEffect + comparison logic with:
const handleSubmit = async (e) => {
  e.preventDefault();
  setBtnLoading(true);
  try {
    const resp = await axios.post("http://localhost:5000/users/login", formData);
    localStorage.setItem("token", resp.data.token);
    navigate("/");
  } catch (err) {
    alert("Invalid Credentials ❌");
  } finally {
    setBtnLoading(false);
  }
};
```
