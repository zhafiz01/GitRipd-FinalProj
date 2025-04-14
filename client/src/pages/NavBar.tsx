import { FC } from "react"
import { NavLink } from "react-router-dom"
import "./NavBar.css"

const NavBar: FC = () => {
	return (
		<nav className="navbar">
			<NavLink
				to="/dashboard"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				Dashboard Icon
			</NavLink>
			<NavLink
				to="/select"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				Add Icon
			</NavLink>
			<NavLink
				to="/plans"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				List Icon
			</NavLink>
		</nav>
	)
}

export default NavBar
