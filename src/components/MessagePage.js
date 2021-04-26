import React from 'react';

const MessagePage = ({ message, urlLink, textLink }) => {
	return (
		<div
			style={{
				fontSize: 20,
				paddingTop: 40,
				textAlign: 'center',
			}}
		>
			{message}
			<br />
			<br />
			<a
				href={urlLink}
				style={{
					color: 'green',
				}}
			>
				<button>{textLink}</button>
			</a>
		</div>
	);
};

export default MessagePage;
