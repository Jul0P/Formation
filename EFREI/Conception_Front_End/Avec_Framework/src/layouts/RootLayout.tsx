import { Outlet } from "react-router"
import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"

export default function RootLayout() {
  return <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
}