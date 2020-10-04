import React from 'react';
// import styled from 'styled-components';

import Asset from './Asset.jsx';
import Carousel from 'react-elastic-carousel';

import '../style/AssetMenu.css';
import test from '../images/test.jpg';

class AssetMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="shelf">
            <Carousel itemsToShow={2}>
                <Asset image_url={test} width={10} height={10} />
                <Asset image_url={test} width={30} height={5} />
                <Asset image_url={test} width={18} height={15} />
            </Carousel>
            </div>
        );
    }

}

export default AssetMenu;