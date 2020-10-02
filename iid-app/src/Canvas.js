import React from 'react';
import {Stage, Star, Layer, Text} from 'react-konva';
import { Button } from 'react-bootstrap';
import { View } from 'react-native';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDragging : false,
            x: 50,
            y: 50,
            canvasWidth: 250,
            canvasHeight: 250
        };
    }

    componentDidMount() {
        this.checkSize();
        window.addEventListener("resize", this.checkSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkSize);
    }
   
    checkSize = () => {
        const width = this.container.offsetWidth;
        this.setState({
          canvasWidth: width,
        });
      };

    render() {
        return (
            <div>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <div
                    style={{
                        width:"50%",
                        height:"50%",
                        border: "2px solid grey"
                    }}
                    ref={node => {
                        this.container = node;
                    }}
                
                >
                    <Stage width={this.state.canvasWidth} height={this.state.canvasHeight} style={{background: 'yellow'}}>
                        <Layer>
                        <Text
                            text="Draggable Text"
                            x={this.state.x}
                            y={this.state.y}
                            draggable
                            fill={this.state.isDragging ? 'green' : 'black'}
                            onDragStart={() => {
                            this.setState({
                                isDragging: true
                            });
                            }}
                            onDragEnd={e => {
                            this.setState({
                                isDragging: false,
                                x: e.target.x(),
                                y: e.target.y()
                            });
                            }}
                        />
                        </Layer>
                    </Stage>
                    </div>
                    <div>
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}> {/* space around not working right now*/}
                            <Button>Save</Button>
                            <Button>Edit Wall Size/Color</Button>
                            <Button>Import Photo</Button>
                            <Button>Clear</Button>
                        </View>
                    </div>
                </View>
            </div>
        )
    }

}

export default Canvas