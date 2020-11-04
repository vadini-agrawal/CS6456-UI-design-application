import * as React from "react";
import { Stage, Layer, Line } from "react-konva";
import {Button} from 'react-bootstrap';
import {ChromePicker} from 'react-color';
import {Slider} from '@material-ui/core';
import {Text} from 'react-native';
import html2canvas from 'html2canvas';



export default class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lineColor: '#000000',
            allLines:[],
            colorInput : false,
            modalInputColor: '',
            widthInput: false,
            lineWidth: 10,
            inputWidth: 10,

        }
    }

  handleMouseDown = () => {
      this._drawing = true;
      this.setState({
        allLines: [...this.state.allLines, [this.state.lineColor, this.state.inputWidth, []]]
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
    let lastLinePoints = lastLine[2];
    let color = lastLine[0];
    let width = lastLine[1];
    lastLinePoints = lastLinePoints.concat([point.x, point.y]);
    let newLastLine = [color, width, lastLinePoints];
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
    this.setState({lineWidth: newValue, inputWidth: newValue});
  }


  screenGrabber() {
          const input = document.getElementsByClassName('draw-canvas')[0];
          html2canvas(input)
          .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              this.props.action(imgData);
          });
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
    const divStyle ={
      display: 'flex',
      alignItems: 'center'
    }
    return (
      <div>
        <div style={divStyle}>
        <Text style={{fontSize:18}}>   Pen Width    </Text>
        <Slider max={50} style={{width: 200}}aria-label= {"Change Pen Width"} valueLabelDisplay="auto" onChange = {this.handleChangeWidthPen} value = {this.state.inputWidth} />
        <Text>       </Text>
        <div className="form-group">
        <button style={{height:60, margin:15, backgroundColor: 'grey', fontSize:'20px'}} onClick={this.handleColorChangeClick}>Pick Pen Color</button>
        {this.state.colorInput ? <div style ={colorPopover}> <div style={cover} onClick={this.handleColorChangeClose} />
        <ChromePicker color={this.state.modalInputColor} onChange = {this.handleChangeColorPen} />
        </div> : null}
        </div>
        </div>
        {/* </View> */}
        <div id="draw-canvas" name="draw-canvas" className="draw-canvas">
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
          {this.state.allLines.map((line, i) => (
            <Line key={i} points={line[2]} stroke={line[0]} strokeWidth={line[1]}/>
          ))}
          </Layer>
        </Stage>
        </div>
        <button style={{backgroundColor:'grey', fontSize:'20px', width: '500px'}} onClick ={() => this.screenGrabber()}>Done</button>
      </div>
    )
  }
}

