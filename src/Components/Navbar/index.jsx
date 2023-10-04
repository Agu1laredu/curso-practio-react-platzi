import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import ShoppingCard from '../ShoppingCard/index'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  const signOut =
    JSON.parse(localStorage.getItem('sign-out')) || context.signOut
  const account = JSON.parse(localStorage.getItem('account')) || context.account

  const hasUserAnAccount = !!account && Object.keys(account).length > 0

  const handleSignOut = () => {
    localStorage.setItem('sign-out', JSON.stringify(true))
    context.setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAccount && !signOut) {
      return (
        <>
          <li key="email" className="text-black/60">
            {account.email}
          </li>
          <li key="my-orders">
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li key="my-account">
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li key="sign-out">
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={handleSignOut}
            >
              Sign out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <li key="sign-in">
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={handleSignOut}
          >
            Sign in
          </NavLink>
        </li>
      )
    }
  }

  const renderCategoryNavLink = (category) => (
    <li key={category}>
      <NavLink
        to={`/${category}`}
        onClick={() => context.setSearchByCategory(category)}
        className={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </NavLink>
    </li>
  )

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        {[
          'clothes',
          'electronics',
          'furnitures',
          'toys',
          'others',
        ].map((category) => renderCategoryNavLink(category))}
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingCard />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
