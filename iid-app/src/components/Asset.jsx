import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';

import '../style/HomePage.css';

function Asset(props)
{   
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => {
    //     setShow(true);
    // }

    let assetWidth = props.data.width;
    let assetHeight = props.data.height;

    // const handleDoubleClick= () => {
    //     console.log("Somethign is happening");
    //     handleShow();
    //     // props.assetSizeHandler(e.currentTarget);
    // }

    // let default_img = <img onDoubleClick={handleDoubleClick} alt={""} src={props.data.image_url} width={assetWidth * 12} height={assetHeight * 12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()}/>;

    // const submitSize = () => {
    //     assetWidth = document.getElementById("changeAssetWidth").value;
    //     assetHeight = document.getElementById("changeAssetHeight").value;
    //     default_img = <img onDoubleClick={handleDoubleClick} alt={""} src={props.data.image_url} width={assetWidth * 12} height={assetHeight * 12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()}/>;
    //     handleClose();
    // }

    return (
        <>
       {/* <Modal show={show} onHide={handleClose}>
         <div className="form-group">
            <label>Enter Height (in inches) (Current value: {assetHeight}) </label>
            <input 
                id="changeAssetHeight"
                type="number"
                // value={assetHeight}
                name="changeAssetHeight"
                className="form-control"
            />
            <label>Enter Width (in inches) (Current value: {assetWidth} </label>
            <input 
                id="changeAssetWidth"
                type="number"
                // value={assetWidth}
                name="changeAssetWidth"
                className="form-control"
            />
            <button  className="modal_button" onClick={submitSize} type="button">Save</button>
            <button  className="modal_button" onClick={handleClose} type="button">Close</button>
        </div>
        </Modal> */}
        {/* { default_img } */}
        <img alt={""} src={props.data.image_url} width={assetWidth * 12} height={assetHeight * 12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()}/>
        </>
    );
}

export default Asset;