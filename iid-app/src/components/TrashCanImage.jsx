import React from "react";
import {Image} from 'react-konva';
import trashCan from '../images/trashCan.jpg';

class TrashCanImage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            image : null,
            x: props.x,
            y: props.y
        }
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = trashCan;
        image.onload = () => {
            this.setState({
              image: image
            });
        };
    }
    
    render() {
        return <Image image={this.state.image} x ={this.state.x} y={this.state.y} height={50} width={50}/>;
    }
}

export default TrashCanImage;