import * as React from 'react';
import { Button } from 'react-bootstrap';
import { View } from 'react-native';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChromePicker } from 'react-color';
import ImageUploader from "react-images-upload";
import Asset from "./Asset";
import DrawCanvas from './DrawCanvas';
import CanvasHolder from './CanvasHolder';
import { API_URL } from './config';

//Images 
import circle from '../images/circlepng.png';
import dresser from '../images/dresser.png';
import plant from '../images/plant.png';
import square from '../images/square.png';
import tv from '../images/tv.png';
import brown_couch from '../images/brown_couch.png'
import flowers from '../images/flowers.png'
import photo_frame from '../images/photo_frame.png'
import tall_lamp from '../images/tall_lamp.png'
import white_couch from '../images/white_couch.png'
import white_lamp from '../images/white_lamp.png'
import white_plant from '../images/white_plant.png'
import side_table from '../images/side_table.png'

import '../style/HomePage.css';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDragging : false,
            x: 50,
            y: 50,
            canvasWidth: 900,
            canvasHeight: 600,
            modalWallSize: false,
            modalWallColor: false,
            modalInputWidth: 75,
            modalInputHeight: 50,
            colorInput: false,
            modalInputColor: "#fff",
            wallColor: "#fff",
            modalInputFloorColor: "#000000",
            floorColor: "#35281e",
            items:[],
            picture: null,
            modalImage: false,
            photoInputHeight: 0,
            photoInputWidth: 0,
            assetList: [],
            clearWall: false,
            modalDraw:false,
            drawing: null,
            drawingInputHeight: 50,
            drawingInputWidth: 50,
            modalAssetSize: false,
            changeAssetHeight: 0,
            changeAssetWidth: 0,
            modalAssetTarget: null,
            submitAssetChange: false,
            isWallAsset: "true", 
            wallImage: null,
        };
        this.componentDrawRef = React.createRef();
        this.componentCanvasRef = React.createRef();
        this.onDrop = this.onDrop.bind(this);
        this.createNewAssetFromDrawing = this.createNewAssetFromDrawing.bind(this);
        this.modalOpenChangeAssetSize = this.modalOpenChangeAssetSize.bind(this);
    }

    componentWillMount() {
        this.createInitialAssets();
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
          [name]: value
        });
    }

    onCapture = uri => {
    }


    onDrop(event) {
        const formData = new FormData();
        formData.append(0, event[0]);
        fetch(`${API_URL}/image-upload`, {
            method: 'POST',
            body: formData
            })
            .then(res => {
                if (!res.ok) {
                    throw res
                }
                return res.json()
            })
            .then(images => {
                if (images !== null && images[0] !== null) {
                    if (images[0].url !== "") {
                        this.setState({
                            picture: images[0].url
                        });
                    }
                }
            });
      }
    

    handleSubmitModalWallColor(e) {
        if (this.state.picture != null) {
            console.log(this.state.picture);
            this.setState({
                wallImage : this.state.picture,
                picture: null,
            })
        } else {
            this.setState({
                wallColor: this.state.modalInputColor,
                floorColor: this.state.modalInputFloorColor,
                wallImage: null,
            });
        }
        this.modalCloseWallColor();
        this.forceUpdate();
    }

    handleSubmitModalWallSize(e) {
        this.setState({
            canvasHeight: this.state.modalInputHeight * 12,
            canvasWidth: this.state.modalInputWidth * 12
        })
        this.modalCloseWallSize();
        this.forceUpdate();
    }

    handleSubmitAssetModal(e) {
        var attrs = this.state.modalAssetTarget.attrs;
        attrs.height = parseInt(this.state.changeAssetHeight) * 12;
        attrs.width = parseInt(this.state.changeAssetWidth) * 12;
        var target = this.state.modalAssetTarget;
        target.attrs = attrs;
        this.setState({modalAssetTarget: target});
        this.modalCloseSize();
    }

    modalCloseSize() {
        this.setState({modalAssetSize:false});
        this.forceUpdate();

    }

    modalOpenChangeAssetSize(target) {
        this.setState({modalAssetSize: true, modalAssetTarget: target, changeAssetHeight: parseInt(target.attrs.height / 12), changeAssetWidth: parseInt(target.attrs.width / 12)});
    }

    modalOpenWallColor() {
        this.setState({modalWallColor: true});
    }

    modalOpenWallSize() {
        this.setState({modalWallSize: true})
    }

    modalOpenImage() {
        this.setState({modalImage: true});
    }

    modalOpenDraw() {
        this.setState({modalDraw: true})
    }

    modalCloseDraw() {
        this.setState({modalDraw: false})
    }

    modalCloseImage() {
        this.setState({modalImage: false});
    }

    modalCloseWallSize() {
        this.setState({modalWallSize: false});
    }

    modalCloseWallColor() {
        this.setState({modalWallColor: false});
    }

    handleChangeColorWall = (color, event) => {
        this.setState({modalInputColor: color.hex});
    }

    handleChangeColorFloor = (color, event) => {
        this.setState({modalInputFloorColor: color.hex, floorColor: color.hex});
    }

    createNewAssetFromDrawing(img) {
        var wallAssetBool;
        if (this.state.isWallAsset === "true") {
            wallAssetBool = true;
        } else {
            wallAssetBool = false;
        }
        var propsData = {
            image_url: img,
            width: this.state.drawingInputWidth,
            height: this.state.drawingInputHeight,
            isWallAsset: wallAssetBool
        };
        var newAsset = <Asset data={propsData} />
        var assetListNew = [newAsset].concat(this.state.assetList);
        this.setState({
            assetList: assetListNew,
            drawingInputHeight: 10,
            drawingInputWidth: 10,
            isWallAsset: true
        });
        this.modalCloseDraw();
    }

    createInitialAssets() {
        var propsData = {
            image_url: dresser,
            width: 10,
            height: 10,
            isWallAsset: "false"
        };
        var propsData2 = {
            image_url: circle,
            width: 10,
            height: 10,
            isWallAsset: "true"
        };
        var propsData3 = {
            image_url: plant,
            width: 10,
            height: 10,
            isWallAsset: "false"
        };
        var propsData4 = {
            image_url: square,
            width: 10,
            height: 10, 
            isWallAsset: "true"
        };
        var propsData6 = {
            image_url: brown_couch,
            width: 33,
            height: 15,
            isWallAsset: "false"
        }
        var propsData7  = {
            image_url: flowers,
            width: 8,
            height: 10,
            isWallAsset: "false"
        }
        var propsData8 = {
            image_url: photo_frame,
            width: 10,
            height: 10.5,
            isWallAsset: "true"
        }
        var propsData9 = {
            image_url: tall_lamp,
            width: 9,
            height: 20,
            isWallAsset: "false"
        }
        var propsData10 = {
            image_url: white_couch,
            width: 33,
            height: 15,
            isWallAsset: "false"
        }
        var propsData11 = {
            image_url: white_lamp,
            width: 7,
            height: 10,
            isWallAsset: "false"
        }
        var propsData12 = {
            image_url: white_plant,
            width: 8,
            height: 12,
            isWallAsset: "false"
        }
        var propsData13 = {
            image_url: side_table,
            width: 10,
            height: 10,
            isWallAsset: "false"
        }
        var list = [<Asset data={propsData13} />, <Asset data={propsData6} />, <Asset data={propsData7} />, <Asset data={propsData8} />, <Asset data={propsData9} />, <Asset data={propsData10} />,  <Asset data={propsData11} />,  <Asset data={propsData12} /> , <Asset data={propsData}/>, <Asset data={propsData2} />, <Asset data={propsData3} />, <Asset data={propsData4} /> ];
        this.setState({assetList: list});
    }


    handleColorChangeClick = () => {
        this.setState({colorInput : true});
    }

    handleColorChangeClose = () => {
        this.setState({colorInput : false});
    }

    popUpChange(e) {
        let value = e.target.value;
        this.setState({canvasWidth: value});
    }

    clearWall() {
        this.setState({clearWall: true});
        setTimeout(function() { 
            this.setState({clearWall: false})
        }.bind(this), 100)
    }


    uploadPhotos() {
        if (this.state.picture != "") {
            var propsData = {
                image_url: this.state.picture,
                width: Number(this.state.photoInputWidth),
                height: Number(this.state.photoInputHeight),
                isWallAsset: this.state.isWallAsset
            };
            var newAsset = <Asset data={propsData} />
            var assetListNew = [newAsset].concat(this.state.assetList);
            this.setState({
                assetList: assetListNew,
                picture: null,
                photoInputHeight: 10,
                photoInputWidth: 10,
                isWallAsset: "true"
            });
            this.modalCloseImage();
        } else {
            console.log("Something went wrong importing the image");
        }
    }

    render() {
        document.body.style = 'background: #FEF9E2'
        const colorPopover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }

        return (
            <div>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <style type="text/css">
                    {`
                    .btn-home {
                    background-color: teal;
                    color: white;
                    padding: 1rem 1rem;
                    font-size: 1rem;
                    margin: 1rem;
                    }

                    .inputWall {
                        font-size: 20px;
                        padding: 2px 2px;
                    }
                    `}
                </style>

                <div>
                    <View style={{flex: 1, flexDirection: 'column'}}> {/* space around not working right now*/}
                        <Button variant="home" onClick= {e=> this.modalOpenWallSize(e)}>Edit Wall Size</Button>
                        <Modal className="modal" show={this.state.modalWallSize} onHide={e => this.modalCloseWallSize}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-evenly' }}>
                            <div className="form-group">
                                <label style={{marginRight: 20, fontSize:'15px'}}>Enter Height (in inches)</label>
                                <label style={{marginLeft: 20, fontSize:'15px'}}>Enter Width (in inches)</label>
                                </div>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-evenly'}}>
                                <input 
                                    style={{width : 100, marginBottom:20}}
                                    type="number"
                                    value={this.state.modalInputHeight}
                                    name="modalInputHeight"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                                />
                                <input 
                                    style={{width: 100, marginBottom:20}}
                                    type="number"
                                    value={this.state.modalInputWidth}
                                    name="modalInputWidth"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                                />
                                </View>
                                <button className="modal_button" onClick={e => this.handleSubmitModalWallSize(e)} type="button">
                                Save
                                </button>
                                <button className="modal_button" onClick={e => this.modalCloseWallSize(e)} type="button">
                                Cancel
                                </button>
                        </Modal>
                        <Button variant="home" onClick= {e=> this.modalOpenWallColor(e)}>Edit Wall Background</Button>
                        <Modal className="modal" show={this.state.modalWallColor} onHide={e => this.modalCloseWallColor}>
                        <ImageUploader
                                withIcon={false}
                                withPreview={true}
                                label=""
                                buttonText="Select Photo"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg", ".jpeg"]}
                                maxFileSize={1048576}
                                fileSizeError=" file size is too big"
                                singleImage={true}
                            />

                                <div className="form-group">
                                <View style={{flex: 1, flexDirection: 'column', justifyContent:'space-evenly'}}>
                                <button className="modal_button" onClick={this.handleColorChangeClick}>Pick Wall Color</button>
                                {this.state.colorInput ? <div style ={colorPopover}> <div style={cover} onClick={this.handleColorChangeClose} />
                                <ChromePicker color={this.state.modalInputColor} onChange = {this.handleChangeColorWall} />
                                </div> : null}
                                <button className="modal_button" onClick={e => this.handleSubmitModalWallColor(e)} type="button">
                                Save
                                </button>
                                <button className="modal_button" onClick={e => this.modalCloseWallColor(e)} type="button">
                                Cancel
                                </button>
                                </View>
                                </div>
                        </Modal>
                        <Button variant="home" onClick= {e => this.modalOpenImage(e)}>Import Asset</Button>
                        <Modal show= {this.state.modalImage} onHide={e => this.modalCloseImage}>
                            <ImageUploader
                                withIcon={false}
                                withPreview={true}
                                label=""
                                buttonText="Select Photo"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg", ".jpeg"]}
                                maxFileSize={1048576}
                                fileSizeError=" file size is too big"
                                singleImage={true}
                            />
                            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
                            <div className="form-group">
                                <label style={{marginLeft: 20, fontSize:'15px'}}>Enter Height (inches)</label>
                                <label style={{marginLeft: 20, fontSize:'15px'}}>Enter Width (inches)</label>
                                <label style={{marginLeft: 25, fontSize:'15px'}}> Asset type </label>

                            </div>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-evenly'}}>
                            <input 
                                    style={{width: 100, marginBottom:20}}
                                    type="number"
                                    value={this.state.photoInputHeight}
                                    name="photoInputHeight"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                            />
                            <input 
                                    style={{width: 100, marginBottom:20}}
                                    type="number"
                                    value={this.state.photoInputWidth}
                                    name="photoInputWidth"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                            />
                            <select name="isWallAsset" 
                                    style={{width: 100, marginBottom:20}}
                                    onChange={e => this.handleChange(e)}
                                    className="form-control">
                                <option value="true" selected>Wall</option>
                                <option value="false">Floor</option>
                            </select>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <button className="modal_button" onClick= {e => this.uploadPhotos(e)}>Done</button>
                                <button className="modal_button" onClick= {e => this.modalCloseImage(e)}>Cancel</button>
                            </View>
                            
                        </Modal>
                        <Button variant="home" onClick = {e => this.modalOpenDraw(e)}>Draw Asset</Button>
                        <Modal show={this.state.modalDraw} onHide={e => this.modalCloseDraw}>
                            <React.Fragment>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
                            <div className="form-group">
                                <label style={{marginLeft: 20, fontSize:'15px'}}>Enter Height (inches)</label>
                                <label style={{marginLeft: 20, fontSize:'15px'}}>Enter Width (inches)</label>
                                <label style={{marginLeft: 25, fontSize:'15px'}}> Asset type </label>

                            </div>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-evenly'}}>
                            <input 
                                    style={{width: 100, marginBottom:10}}
                                    type="number"
                                    value={this.state.drawingInputHeight}
                                    name="drawingInputHeight"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                            />
                            <input 
                                    style={{width: 100, marginBottom:10}}
                                    type="number"
                                    value={this.state.drawingInputWidth}
                                    name="drawingInputWidth"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                            />
                            <select name="isWallAsset" 
                                    style={{width: 100, marginBottom:10}}
                                    onChange={e => this.handleChange(e)}
                                    className="form-control">
                                <option value="true" selected>Wall</option>
                                <option value="false">Floor</option>
                            </select>
                            </View>
                            <div id = "draw-canvas">
                            <DrawCanvas action={this.createNewAssetFromDrawing} ref={this.componentDrawRef} height = {this.state.canvasHeight} width = {500} />
                            </div>
                            <button className="modal_button" onClick = {e => this.modalCloseDraw(e)}>Cancel</button>
                            </React.Fragment>
                        </Modal>
                        <Button variant="home" onClick = {e => this.createInitialAssets()}>Clear Assets</Button>
                        <Button variant="home" onClick = {e => this.clearWall()}>Clear Wall</Button>
                    </View>
                </div>
                <div
                    id = 'canvasHolder'
                    style={{
                        border: "2px solid grey",
                    }}
                    ref={node => {
                        this.container = node;
                    }} >
                <Modal show={this.state.modalAssetSize} onHide={e => this.modalCloseSize(e)}>
                    <div className="form-group">
                    <label>Enter Height (in inches) </label>
                    <input 
                        type="number"
                        value={this.state.changeAssetHeight}
                        name="changeAssetHeight"
                        onChange={e => this.handleChange(e)}
                        className="form-control"
                    />
                    <label>Enter Width (in inches) </label>
                    <input 
                        type="number"
                        value={this.state.changeAssetWidth}
                        name="changeAssetWidth"
                        onChange={e => this.handleChange(e)}
                        className="form-control"
                    />
                    <button  className="modal_button" onClick={e => this.handleSubmitAssetModal(e)} type="button">
                    Save
                    </button>
                    </div>
                </Modal>       
                <CanvasHolder 
                    ref={this.componentCanvasRef} width={this.state.canvasWidth} height={this.state.canvasHeight} 
                    floorColor={this.state.floorColor} wallColor={this.state.wallColor} assetList={this.state.assetList} 
                    clearWall={this.state.clearWall} assetSizeHandler={this.modalOpenChangeAssetSize} wallImage={this.state.wallImage}/>
                </div>
                </View>
            </div>
        )
    }
}

export default HomePage
