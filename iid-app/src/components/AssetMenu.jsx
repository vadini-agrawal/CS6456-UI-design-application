import React from 'react';
// import styled from 'styled-components';
import { Layer} from 'react-konva';
import Carousel from 'react-elastic-carousel';

import '../style/AssetMenu.css';


class AssetMenu extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         hasImages : false,
    //         assetList : this.props.assetList,
    //     };
    //     } 

    // componentWillUpdate() {
    //     this.setState({
    //         assetList: this.props.assetList
    //     });
    //     console.log("THIS IS THE CURRENT ASSET LIST");
    //     console.log(this.props.assetList);
    // }

    render() {
        return (
            <div className="shelf">
            <Carousel itemsToShow={4}>
                {this.props.assetList}
            </Carousel>
            </div>
        );
    }

}

export default AssetMenu;