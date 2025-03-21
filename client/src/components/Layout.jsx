import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    return (
        <div className='p-4 min-h-screen flex flex-col container mx-auto'>
            <Header />
            <Outlet/>
        </div>
    )
}

export default Layout