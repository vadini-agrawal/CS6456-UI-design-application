import React from 'react';


function Asset(props)
{   

    return <img alt={""} src={props.data.image_url} width={props.data.width*12} height={props.data.height*12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()}/>;
}

export default Asset;