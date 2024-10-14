
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Help from './pages/help/Help'
import HomePage from './pages/home/Home'
import SignUp from './pages/signUp/SignUp'
import Login from './pages/login/Login'
import CompanyUser from './pages/CompanyUser/CompanyUser'
import Dashboard from './pages/CompanyUser/Dashboard'
import EditTickets from "./pages/CompanyUser/EditTickets"
import CreateTickets from './pages/CompanyUser/CreateTickets'
import Profile from './components/Profile/Profile'
import User from './pages/user/User'
import UpdateTickets from './pages/user/UpdateTickets'
import UserDashboard from './pages/user/UserDashboard'
import Admin from './pages/admin/Admin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AssignTicket from './pages/admin/AssignTicket'
import Sidebar from './components/CompanySideBar/Sidebar'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout><HomePage /></Layout>,
//   },
//   {
//     path: "/login",
//     element: <Layout><Login /></Layout>,
//   },
//   {
//     path: "/sign-up",
//     element: <Layout><SignUp /></Layout>,
//   },
//   {
//     path: "/company",
//     element: <c />,
//     children: [
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "edit-tickets",
//         element: <EditTickets />,
//       },
//       {
//         path: "create-tickets",
//         element: <CreateTickets />,
//       },
//       {
//         path: "profile",
//         element: <Profile />,
//       },
//     ],
//   },
//   {
//     path: "/user",
//     element: <User />,
//     children: [
//       {
//         path: "dashboard",
//         element: <UserDashboard />,
//       },
//       {
//         path: "update-tickets",
//         element: <UpdateTickets />,
//       }
//       ,
//       {
//         path: "profile",
//         element: <Profile />,
//       }
//     ],
//   },
//   {
//     path: "/admin",
//     element: <Admin />,
//     children: [
//       {
//         path: "dashboard",
//         element: <AdminDashboard />,
//       },
//       {
//         path: "assign-tickets",
//         element: <AssignTicket />,
//       },
//       {
//         path: "profile",
//         element: <Profile />,
//       },
//     ]
//   },
//   {
//     path: "/help",
//     element: <Help />
//   },
// ]);


function App() {
console.log("hello");
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />
        <Route path='/login' element={<Layout><Login /></Layout>} />
        <Route path='/sign-up' element={<Layout><SignUp /></Layout>} />

        <Route path='/company' element={<CompanyUser />}>
          <Route index element={<Dashboard />} />
          <Route path='/company/edit-tickets' element={<EditTickets />} />
          {/* <Route path='create-tickets' element={<CreateTickets />} /> */}
          <Route path='/company/profile' element={<Profile />} />
        </Route>

        <Route path='/user' element={<User />}>
          <Route index element={<UserDashboard />} />
          <Route path='update-tickets' element={<UpdateTickets />} />
          {/* <Route path='create-tickets' element={<CreateTickets />} /> */}
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path='/admin' element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path='assign-tickets' element={<AssignTicket />} />
          {/* <Route path='create-tickets' element={<CreateTickets />} /> */}
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/help' element={<Layout><Help /></Layout>} />
        <Route path='*' element={<Layout><div>error</div></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
