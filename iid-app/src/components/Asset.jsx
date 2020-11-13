import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';

function Asset(props) {
    let assetWidth = props.data.width;
    let assetHeight = props.data.height;

    return (
        <img alt={""} src={props.data.image_url} width={assetWidth * 12} height={assetHeight * 12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()}/>
    );
}

export default Asset;