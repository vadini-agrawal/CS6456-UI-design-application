import React, {useState} from 'react';
import {useImage} from 'react-image';


function Asset(props)
{   

    return <img src={props.data.image_url} width={props.data.width*12} height={props.data.height*12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()} data-_id={props.data._id}/>;
}

export default Asset;