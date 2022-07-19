import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
	children: JSX.Element
}

const Private = (props: PrivateProps) => {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/login" state={'you must be logged in'} />;
	}

	return props.children;
};

export default Private;
