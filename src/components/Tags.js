const Tags = ({ tagsArray }) => {
	let tags = '';
	for (let i = 0; i <= tagsArray.length - 1; i++) {
		tags +=
			i === tagsArray.length - 1 ? `${tagsArray[i]}` : `${tagsArray[i]}, `;
	}

	return <>{tags}</>;
};

export default Tags;
