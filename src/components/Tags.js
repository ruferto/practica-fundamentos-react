
const Tags = ( {tagsArray} ) => {
    let tags = '';
    for(let i=0; i<=tagsArray.length-1; i++){
        if(i === tagsArray.length-1){
            tags += `${tagsArray[i]}`;
        }else{
            tags += `${tagsArray[i]}, `
        }
    }
    
    return <div>{tags}</div>
}

export default Tags;