import React, {useState} from 'react';

function Asset(props)
{
    return <img src={props.data.image_url} width={props.data.width*12} height={props.data.height*12} draggable="true"/>;
}

export default Asset;