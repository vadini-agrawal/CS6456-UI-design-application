import React from 'react';
import Modal from 'react-bootstrap/Modal';

function Asset(props)
{   
    let modalOpen = false;

    const modalClose = (e) => {
        modalOpen = false;
    }

    const openModal= () => {
        modalOpen = true;
    }

    const handleDoubleClick= () => {
        console.log("Somethign is happening");
        openModal();
        // props.assetSizeHandler(e.currentTarget);
    }

    return (
        <div>
        <Modal show={modalOpen}>
        <div className="form-group">
        <label>Enter Height (in inches) </label>
        <input 
            type="number"
            // value={this.state.changeAssetHeight}
            // name="changeAssetHeight"
            // onChange={e => this.handleChange(e)}
            // className="form-control"
        />
        <label>Enter Width (in inches) </label>
        <input 
            type="number"
            // value={this.state.changeAssetWidth}
            // name="changeAssetWidth"
            // onChange={e => this.handleChange(e)}
            // className="form-control"
        />
        <button  className="modal_button" type="button">
        Save
        </button>
        </div>
         </Modal>       
        <img onDoubleClick={handleDoubleClick} alt={""} src={props.data.image_url} width={props.data.width*12} height={props.data.height*12} draggable="true" data-iswallasset={props.data.isWallAsset.toString()}/>
        </div>
    );
}

export default Asset;