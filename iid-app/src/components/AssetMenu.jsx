import React from 'react';
// import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

import '../style/AssetMenu.css';


class AssetMenu extends React.Component {

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