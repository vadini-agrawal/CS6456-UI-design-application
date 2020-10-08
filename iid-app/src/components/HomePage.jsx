import React from 'react';
import { View } from 'react-native';
import Canvas from './Canvas';
import EditMenu from './EditMenu';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDragging : false,
            x: 50,
            y: 50,
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
                        width:"80%",
                        height:"80%",
                        border: "2px solid grey"
                    }}
                    ref={node => {
                        this.container = node;
                    }} >
                <Canvas width={1150} height={450}/>
                </div>
                <EditMenu />
                </View>
            </div>
        )
    }
}

export default HomePage
