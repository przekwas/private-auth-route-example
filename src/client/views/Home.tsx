import * as React from 'react';
import { useEffect, useState } from 'react';
import type { IMessage } from '../../types';

interface HomeProps {}

const Home = (props: HomeProps) => {
	const [messages, setMessages] = useState<IMessage[] | null>(null);
	useEffect(() => {
		fetch('/api/messages')
			.then(r => r.json())
			.then(d => setMessages(d));
	}, []);

	if (!messages) {
		return (
			<div>
				<h1 className="text-center">Loading Messages ...</h1>
			</div>
		);
	}

	return (
		<main className="container">
			<section className="row justify-content-center">
				<div className="col-md-6">
					<ul className="list-group">
						{messages.map(msg => (
							<li key={`msg-id-${msg.id}`} className="list-group-item">
								<b>{msg.email}</b>: {msg.message}
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default Home;
