import * as React from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import Modal from 'react-bootstrap/Modal';
import {ChromePicker} from 'react-color';
import {Slider} from '@material-ui/core';
import {makeStyles, styled} from '@material-ui/core/styles';

const sliderStyle = makeStyles ({
  root: {
    width: 200,
  },
});

const mySlider = styled(Slider)({
  width: 200,
})

export default class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lineColor: '#000000',
            allLines:[],
            colorInput : false,
            modalInputColor: '',
            widthInput: false,
            lineWidth: 1,
            modalWidthInput: 1,

        }
    }

  handleMouseDown = () => {
      this._drawing = true;
      this.setState({
        allLines: [...this.state.allLines, [this.state.lineColor, []]]
      })
  };

  handleMouseUp = () => {
      this._drawing = false;
  };

  handleMouseMove = e => {
    if (!this._drawing) {
          return;
    }
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();    
    const allLines = this.state.allLines;
    let lastLine = allLines[allLines.length - 1];
    let lastLinePoints = lastLine[1];
    let color = lastLine[0];
    console.log("color " + color);
    lastLinePoints = lastLinePoints.concat([point.x, point.y]);
    let newLastLine = [color, lastLinePoints];
    allLines.splice(allLines.length - 1, 1, newLastLine);
      this.setState({
        allLines: allLines.concat()
      });
    
  };


  handleColorChangeClick = () => {
    this.setState({colorInput : true});
  }

  handleColorChangeClose = () => {
    this.setState({colorInput : false});
  }

  handleChangeColorPen = (color, event) => {
    this.setState({modalInputColor: color.hex, lineColor: color.hex});
  }

  handleLineWidthChangeClick = () => {
    this.setState({widthInput: true});
  }

  handleLineWidthChangeClose = () => {
    this.setState({widthInput: false});
  }
  
  handleChangeWidthPen = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    this.setState({lineWidth: [newValue]});
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
    const MySlider = styled(Slider)({
      width: 200,
    });
    return (
      <div>
        <div className="form-group">
        <button onClick={this.handleColorChangeClick}>Pick Pen Color</button>
        {this.state.colorInput ? <div style ={colorPopover}> <div style={cover} onClick={this.handleColorChangeClose} />
        <ChromePicker color={this.state.modalInputColor} onChange = {this.handleChangeColorPen} />
        </div> : null}
        <div>
        <MySlider onChange = {this.handleChangeWidthPen}></MySlider>
        </div>
        {/* <button onClick={this.handleLineWidthChangeClick}>Pick Pen Width</button>
        {this.state.widthInput ? <div style={colorPopover}> <div style={cover} onClick={this.handleLineWidthChangeClose} />
        <LineWidthPicker onChange={this.handleChangeWidthPen} opacity={1} />
        </div> : null} */}
        </div>
        <Stage
          width={this.props.width}
          height={this.props.height}
          onContentMousedown={this.handleMouseDown}
          onContentMousemove={this.handleMouseMove}
          onContentMouseup={this.handleMouseUp}
          ref={node => {
            this.stageRef = node;
          }}
        >
          <Layer>
            <Text text="Draw a thing!" />
          {this.state.allLines.map((line, i) => (
            <Line key={i} points={line[1]} stroke={line[0]} />
          ))}
          </Layer>
        </Stage>
      </div>
    )
  }
}

