import React from 'react';
import { Button } from 'react-bootstrap';
import { View } from 'react-native';
import Canvas from './Canvas';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChromePicker } from 'react-color';
import ImageUploader from "react-images-upload";
import Asset from "./Asset";
import { API_URL } from './config'


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDragging : false,
            x: 50,
            y: 50,
            canvasWidth: 750,
            canvasHeight: 500,
            modalWall: false,
            modalInputWidth: 750,
            modalInputHeight: 500,
            colorInput: false,
            modalInputColor: "#fff",
            wallColor: "#fff",
            modalInputFloorColor: "#000000",
            floorColor: "#000000",
            items:[],
            picture: null,
            modalImage: false,
            photoInputHeight: 0,
            photoInputWidth: 0,
            assetList: [],
            clearWall: false
        };
        this.onDrop = this.onDrop.bind(this);
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

    onDrop(event) {
        const formData = new FormData();
        console.log(event);
        formData.append(0, event[0]);
        console.log("FILE DATAAAA");
        console.log(formData.get("0"));
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
                this.setState({
                  picture: images[0].url
                });
            });
      }
    

    handleSubmitModal(e) {
        this.setState({
            canvasWidth: this.state.modalInputWidth, 
            canvasHeight: this.state.modalInputHeight,
            wallColor: this.state.modalInputColor,
            floorColor: this.state.modalInputFloorColor
        });
        this.modalCloseWall();
        this.forceUpdate();
    }

    modalOpenWall() {
        this.setState({modalWall: true});
    }

    modalOpenImage() {
        this.setState({modalImage: true});
    }

    modalCloseImage() {
        this.setState({modalImage: false});
    }

    modalCloseWall() {
        this.setState({modalWall: false});
    }

    handleChangeColorWall = (color, event) => {
        console.log('changing wall color');
        this.setState({modalInputColor: color.hex, wallColor: color.hex});
    }

    handleChangeColorFloor = (color, event) => {
        console.log('changing floor color');
        this.setState({modalInputFloorColor: color.hex, floorColor: color.hex});
    }

    createInitialAssets() {
        var propsData = {
            image_url: 'https://konvajs.org/assets/lion.png',
            width: 10,
            height: 8
        };
        var propsData1 = {
            image_url: 'https://konvajs.org/assets/lion.png',
            width: 14,
            height: 7
        };
        var propsData2 = {
            image_url: 'https://konvajs.org/assets/lion.png',
            width: 8,
            height: 14
        };
        var list = [<Asset data={propsData}/>, <Asset data={propsData1} />, <Asset data={propsData2} />
        ];
        this.setState({assetList: list})
    }


    // componentDidMount() {
    //     this.checkSize();
    //     window.addEventListener("resize", this.checkSize);
    // }


    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.checkSize);
    // }
   
    // checkSize = () => {
    //     const width = this.container.offsetWidth;
    //     this.setState({
    //       canvasWidth: width,
    //     });
    //   };

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
        //this.setState({clearWall: true});
    }

    uploadPhotos() {
        var propsData = {
            image_url: this.state.picture,
            width: this.state.photoInputWidth,
            height: this.state.photoInputHeight,
        };
        var newAsset = <Asset data={propsData} />
        var assetListNew = this.state.assetList.concat(newAsset);
        this.setState({
            assetList: assetListNew,
            picture: null,
            photoInputHeight: 0,
            photoInputWidth: 0
        });
        this.modalCloseImage();
        // console.log(this.state.assetList);
    }

    render() {
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
                <div>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}> {/* space around not working right now*/}
                        <Button>Save</Button>
                        <Button onClick= {e=> this.modalOpenWall(e)}>Edit Wall Size/Color</Button>
                        <Modal show={this.state.modalWall} onHide={e => this.modalCloseWall}>
                            <div className="form-group">
                                <label>Enter Height</label>
                                <input 
                                    type="number"
                                    value={this.state.modalInputHeight}
                                    name="modalInputHeight"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                                />
                                <label>Enter Width</label>
                                <input 
                                    type="number"
                                    value={this.state.modalInputWidth}
                                    name="modalInputWidth"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                                />
                                <button onClick={this.handleColorChangeClick}>Pick Wall Color</button>
                                {this.state.colorInput ? <div style ={colorPopover}> <div style={cover} onClick={this.handleColorChangeClose} />
                                <ChromePicker color={this.state.modalInputColor} onChange = {this.handleChangeColorWall} />
                                </div> : null}
                            </div>
                            <div className="form-group">
                                <button onClick={e => this.handleSubmitModal(e)} type="button">
                                Save
                                </button>
                            </div>
                        </Modal>
                        <Button onClick= {e => this.modalOpenImage(e)}>Import Photo</Button>
                        <Modal show= {this.state.modalImage} onHide={e => this.modalCloseImage}>
                            <ImageUploader
                                withIcon={false}
                                withPreview={true}
                                label=""
                                buttonText="Select Photos"
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg", ".jpeg"]}
                                maxFileSize={1048576}
                                fileSizeError=" file size is too big"
                                singleImage={true}
                            />
                            <label> Enter Height (in inches) </label>
                            <input 
                                    type="number"
                                    value={this.state.photoInputHeight}
                                    name="photoInputHeight"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                            />
                            <label> Enter Width (in inches) </label>
                            <input 
                                    type="number"
                                    value={this.state.photoInputWidth}
                                    name="photoInputWidth"
                                    onChange={e => this.handleChange(e)}
                                    className="form-control"
                            />
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Button onClick= {e => this.uploadPhotos(e)}>Done</Button>
                                <Button onClick= {e => this.modalCloseImage(e)}>Cancel</Button>
                            </View>
                            
                        </Modal>
                        <Button onClick = {e => this.createInitialAssets()}>Clear Assets</Button>
                        <Button onClick = {e => this.clearWall()}>Clear Wall</Button>
                    </View>
                </div>
                <div
                    style={{
                        border: "2px solid grey",
                    }}
                    ref={node => {
                        this.container = node;
                    }} >
                <Canvas width={this.state.canvasWidth} height={this.state.canvasHeight} floorColor={this.state.floorColor} wallColor={this.state.wallColor} assetList={this.state.assetList} clearWall={this.state.clearWall}/>
                </div>
                </View>
                <img src={this.state.picture} />
            </div>
        )
    }
}

export default HomePage
