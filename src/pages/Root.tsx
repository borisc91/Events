
import MainNavigation from '../components/MainNavigation'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <>
    <nav>
    <MainNavigation/>
    </nav>
    <main>
        <Outlet />
    </main>
    </>
  )
}

export default RootLayout;