import React from 'react';
import { Button } from 'react-bootstrap';
import { View } from 'react-native';
import Canvas from './Canvas';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChromePicker } from 'react-color';

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
            items:[]
        };
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value
        });
      }

    handleSubmitModal(e) {
        this.setState({
            canvasWidth: this.state.modalInputWidth, 
            canvasHeight: this.state.modalInputHeight,
            wallColor: this.state.modalInputColor,
            floorColor: this.state.modalInputFloorColor
        });
        console.log("wall color"+ this.state.wallColor);
        console.log("floor color" + this.state.floorColor);
        this.modalCloseWall();
        this.forceUpdate();
    }

    modalOpenWall() {
        this.setState({modalWall: true});
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
                        <Button>Import Photo</Button>
                        <Button>Clear</Button>
                    </View>
                </div>
                <div
                    style={{
                        border: "2px solid grey",
                    }}
                    ref={node => {
                        this.container = node;
                    }} >
                <Canvas width={this.state.canvasWidth} height={this.state.canvasHeight} floorColor={this.state.floorColor} wallColor={this.state.wallColor}/>
                </div>
                </View>
            </div>
        )
    }
}

export default HomePage
