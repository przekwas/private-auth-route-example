import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Private from './components/Private';

import Home from './views/Home';
import Login from './views/Login';
import Profile from './views/Profile';

interface AppProps {}

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/profile"
					element={
						<Private>
							<Profile />
						</Private>
					}
				/>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
