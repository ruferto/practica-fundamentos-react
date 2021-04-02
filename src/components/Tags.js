
const Tags = ({tagsArray} ) => {
    const tagsElements = tagsArray.map(tag => {
        const tagName = `${tag}, `;
        return tagName;

    });
return <div>{tagsElements}</div>
}

export default Tags;