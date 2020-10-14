import React from 'react';
// import styled from 'styled-components';
import { Layer} from 'react-konva';
import Carousel from 'react-elastic-carousel';

import '../style/AssetMenu.css';


class AssetMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasImages : false,
            assetList : []
        };
    }

    componentWillMount() {
        this.setState({
            assetList: this.props.assetList
        });
    }

    render() {
        return (
            <div className="shelf">
            <Carousel itemsToShow={2}>
                    {this.state.assetList}
            </Carousel>
            </div>
        );
    }

}

export default AssetMenu;