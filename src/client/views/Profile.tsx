import * as React from 'react';
import { useEffect, useState } from 'react';
import type { IMessage } from '../../types';

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
	const [messages, setMessages] = useState<IMessage[] | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		fetch('/api/messages/user', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(r => r.json())
			.then(d => setMessages(d))
			.catch(e => console.error(e));
	}, []);

	if (!messages) {
		return (
			<div>
				<h1 className="text-center">Loading Your Messages ...</h1>
			</div>
		);
	}

	return (
		<main className="container">
			<section className="row justify-content-center">
				<h2 className="text-center">{messages[0]?.email}'s messages: </h2>
				<div className="col-md-6">
					<ul className="list-group">
						{messages.map(msg => (
							<li
								key={`msg-id-${msg.id}`}
								className="list-group-item d-flex justify-content-between align-items-center">
								<div>{msg.message}</div>
								<div>
									<button disabled className="btn btn-sm btn-warning">
										Edit
									</button>
									<button disabled className="btn btn-sm btn-danger">
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default Profile;
