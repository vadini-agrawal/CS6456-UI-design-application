import React, {useState, useEffect} from 'react';

function Asset(props)
{
    const [width] = useState(props.data.width*12);
    const [height] = useState(props.data.height*12);
    return <img src={props.data.image_url} width={width} height={height} draggable="true"/>;

}

export default Asset;