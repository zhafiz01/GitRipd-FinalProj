import { FC } from "react"
import { NavLink } from "react-router-dom"
import "./Header.css"

const Header: FC = () => {
	return (
		<div className="header">
			<NavLink
				to="/welcome"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				Intake Form
			</NavLink>
			<NavLink
				to="/profile"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				Profile Icon
			</NavLink>
		</div>
	)
}

export default Header
