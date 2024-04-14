import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Index from "./pages/Index/Index";
import Category from "./pages/Category/Category";
import ArticleInfo from "./pages/Article-info/ArticleInfo";
import AllCourses from "./pages/AllCourses/AllCourses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AllArticles from "./pages/AllArticles/AllArticles";
import Contact from "./pages/Contact/Contact";
import GlobalSearch from "./pages/GlobalSearch/GlobalSearch";
import AdminDashboard from "./pages/p-Admin/AdminDashboard";
import Articles from "./pages/p-Admin/Articles/Articles";
import Courses from "./pages/p-Admin/Courses/Courses";
import Menus from "./pages/p-Admin/Menus/Menus";
import Users from "./pages/p-Admin/Users/Users";
import DashboardCategory from "./pages/p-Admin/DashboardCategory/DashboardCategory";
import AdminContact from "./pages/p-Admin/AdminContact/AdminContact";
import Sessions from "./pages/p-Admin/Sessions/Sessions";
import SessionInfo from "./pages/SessionInfo/SessionInfo";
import Comments from "./pages/p-Admin/Comments/Comments";
import Offs from "./pages/p-Admin/Offs/Offs";
import Draft from "./pages/p-Admin/Articles/Draft/Draft";
import IndexDashboard from "./pages/p-Admin/Index/IndexDashboard";
import UserPanel from "./pages/UserPanel/UserPanel";
import UserPanelIndex from "./pages/UserPanel/Index/UserPanelIndex";
import Orders from "./pages/UserPanel/Orders/Orders";
import Buyed from "./pages/UserPanel/Buyed/Buyed";
import Ticket from "./pages/UserPanel/SendTicket/Ticket";
import AllTicket from "./pages/UserPanel/AllTicket/AllTicket";
import AnswerTicket from "./pages/UserPanel/AnswerTicket/AnswerTicket";
import EditAccount from "./pages/UserPanel/EditAccount/EditAccount";
import AdminPrivate from "./Private/AdminPrivate";
import AdminTckets from "./pages/p-Admin/Tickets/AdminTckets";
import Discount from "./pages/p-Admin/Discount/Discount";
import NotFound from "./pages/NotFound/NotFound";


const routes = [
    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/courses/:page', element: <AllCourses /> },
    { path: '/articles/:page', element: <AllArticles /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: '/contact', element: <Contact /> },
    { path: "/search/:searchWord", element: <GlobalSearch /> },
    { path: '/session/:courseName/:sessionID', element: <SessionInfo /> },

    {
        path: '/admin-dashboard/*', element:
            <AdminPrivate>
                <AdminDashboard />
            </AdminPrivate>,
        children: [
            { path: '', element: <IndexDashboard /> },
            { path: 'articles', element: <Articles /> },
            { path: 'articles/draft/:shortName', element: <Draft /> },
            { path: 'courses', element: <Courses /> },
            { path: 'menus', element: <Menus /> },
            { path: 'users', element: <Users /> },
            { path: 'category', element: <DashboardCategory /> },
            { path: 'contact', element: <AdminContact /> },
            { path: 'sessions', element: <Sessions /> },
            { path: 'comments', element: <Comments /> },
            { path: 'offs', element: <Offs /> },
            { path: 'discount' , element: <Discount/>},
            { path: 'tickets' , element: <AdminTckets/>},

            { path: '*', element: <NotFound/> }
        ]
    },

    {
        path: '/my-account/*', element: <UserPanel />, children: [
            { path: '', element: <UserPanelIndex /> },
            { path: 'orders', element: <Orders /> },
            { path: 'buyed', element: <Buyed /> },
            { path: 'tickets', element: <AllTicket /> },
            { path: 'tickets/send-ticket', element: <Ticket /> },
            { path: 'tickets/answer/:ticketID', element: <AnswerTicket /> },
            { path: 'edit-account', element: <EditAccount /> },

            { path: '*', element: <NotFound/> }
        ]
    },

    { path: '/*', element: <NotFound/> }

]

export default routes