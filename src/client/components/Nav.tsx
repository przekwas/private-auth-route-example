import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface NavProps {}

const Nav = (props: NavProps) => {
	return (
		<nav className="p-3 mb-5 shadow nav justify-content-center align-items-center">
			<NavLink
				to="/"
				className={({ isActive }) =>
					`mx-5 nav-link ${isActive && 'text-decoration-underline'}`
				}>
				Home
			</NavLink>
			<NavLink
				to="/login"
				className={({ isActive }) =>
					`mx-5 nav-link ${isActive && 'text-decoration-underline'}`
				}>
				Login
			</NavLink>
			<NavLink
				to="/profile"
				className={({ isActive }) =>
					`mx-5 nav-link ${isActive && 'text-decoration-underline'}`
				}>
				Profile
			</NavLink>
		</nav>
	);
};

export default Nav;
