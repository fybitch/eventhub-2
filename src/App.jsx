import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import PageLayout from "./layout/PageLayout"
import ProfilePage from "./pages/ProfilePage"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase/firebase"
import EventDetails from "./components/FeedEvent/EventDetails"


function App() {

  const [authUser] = useAuthState(auth);

  return (
      <PageLayout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
          <Route path="/:username" element={<ProfilePage/>} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </PageLayout>
  )
}

export default App
