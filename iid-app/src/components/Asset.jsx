import React, {useState, useEffect} from 'react';
function Asset(props)
{
    const [width] = useState(props.data.width*12);
    const [height] = useState(props.data.height*12);
    return <img src={props.data.image_url} width={width} height={height} draggable="true"/>;

}

// class Asset extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             width: this.props.width*12,
//             height: this.props.height*12,
//             img: this.props.image_url,
//             weight: this.props.weight,
//         };
//         this.styleObj = {
//             height: this.state.height,
//             width: this.state.width,
//         }
//         this.src = this.state.img;
//     }
  
//     // const LionImage = () => {
//     //     const [image] = useImage('https://konvajs.org/assets/lion.png');
//     //     return <Image image={image} />;
//     //   };
      

//     render() {
//         return (
//             <img 
//                 src={this.state.img} 
//                 style={this.styleObj}
//                 draggable="true"
//                 ></img>
//         )
//     }

// }

export default Asset;