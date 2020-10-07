import React from 'react';
import AssetMenu from './AssetMenu.jsx';
import {Stage, Star, Layer, Text, Image} from 'react-konva';
import { Button } from 'react-bootstrap';
import { View } from 'react-native';
import useImage from 'use-image';
import Canvas from './Canvas';


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDragging : false,
            x: 50,
            y: 50,
            canvasWidth: 250,
            canvasHeight: 250,
            items:[]
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
                    }} >
                <Canvas width={this.state.canvasWidth} height={this.state.canvasHeight}/>
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

export default HomePage
