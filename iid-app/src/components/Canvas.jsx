import React, {useEffect} from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import {Button} from "react-bootstrap";
import useImage from 'use-image';
import AssetMenu from './AssetMenu';
import TrashCanImage from './TrashCanImage';
import '../style/AssetMenu.css';
import Modal from 'react-bootstrap/Modal';

const URLImage = ({ image, height, width, onDragEnd, onDragStart, originalX, originalY, onDblClick }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      height={height}
      width={width}
      draggable
      // I will use offset to set origin to the center of the image
      offsetX={img ? width / 2 : 0}
      offsetY={img ? height / 2 : 0}
      onDragEnd = {onDragEnd}
      onDragStart = {onDragStart}
      originalX = {originalX}
      originalY = {originalY}
      onDblClick = {onDblClick}
    />
  );
};




const Canvas = (props) => {
  const dragUrl = React.useRef();
  const imgHeight = React.useRef();
  const imgWidth = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const test = [10,70, 130];
  const [modalChangeSize, changeSize] = React.useState(false);
  const [modalInputHeight, changeHeight] = React.useState(0);
  const [modalInputWidth, changeWidth] = React.useState(0);
  
  useEffect(() => {
    if (!images) {
      console.log('run something here');
    }
}, [images]);


  if(props.submitAssetChange) {
    console.log('submitted');
  }

  const handleDragEnd = (e) => {
    if (e.target.attrs.x > (0) &&
    e.target.attrs.x < (props.width - 50)&& 
    e.target.attrs.y > 0 && 
    e.target.attrs.y < 50) {
      setImages(images.filter(item => (item.x !== e.target.attrs.originalX || item.y !== e.target.attrs.originalY 
        || item.src !== e.target.attrs.image.currentSrc || item.width !== e.target.attrs.width || item.height !== e.target.attrs.height)));
    } else {
      console.log("not trash");
    }
  }
  
  const handleDragStart = (e) => {
    console.log("Drag Start");
    console.log(e);
  }

  const handleDoubleClk = (e) => {
    console.log("doubleClick");
    console.log(e);
    props.assetSizeHandler(e.currentTarget);
    changeSize(true);
  }

  
  if (props.clearWall == true && images.length != 0){
    images.splice(0, images.length);
  }
  return (
    <div>
      <div
        id = "divToPrint"
        className = "mt4"
        onDrop={e => {
          // register event position
          stageRef.current.setPointersPositions(e);

          // add image
          if (stageRef.current.getPointerPosition().x > (0) &&
              stageRef.current.getPointerPosition().x < (props.width - 50) && 
              stageRef.current.getPointerPosition().y > 0 && 
              stageRef.current.getPointerPosition().y < 50) {
              } else {
                setImages(
                  images.concat([
                    {
                      ...stageRef.current.getPointerPosition(),
                      src: dragUrl.current,
                      height: imgHeight.current,
                      width: imgWidth.current
                    }
                  ])
                );
              }
            }
            }
        onDragOver={e => e.preventDefault()}
      >
        <Stage
          width={props.width}
          height={props.height}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>

            <Rect 
              x={0}
              y={0}
              width={props.width}
              height={props.height}
              fill={props.wallColor}
            />
            <TrashCanImage
              x = {0}
              y = {0}
              />
          </Layer>
          <Layer>
            {test.map(test => {
              var img = new window.Image();
              img.src = "https://konvajs.org/assets/lion.png"
              return <Image x={test} y={test} src = {img} width={50} height={50}/>
            })}
          </Layer>
          <Layer>

            {images.map(image => {
                return <URLImage image={image} height={image.height} width={image.width} onDragEnd={handleDragEnd} onDragStart={handleDragStart} originalX={image.x} originalY={image.y} onDblClick={handleDoubleClk}/>;
            })}
          </Layer>
          <Layer>
            <Rect
              x={0}
              y={props.height - 32}
              height = {2}
              width = {props.width}
              fill = "white"
              />
            <Rect 
              x={0}
              y={props.height - 30}
              width = {props.width}
              height = {30}
              fill={props.floorColor}
              />
          </Layer>
        </Stage>
      </div>
        <div 
        onDragStart={e => {
          dragUrl.current = e.target.src;
          imgHeight.current = e.target.height;
          imgWidth.current = e.target.width;
        }}
        >
      <Layer>
        <AssetMenu assetList = {props.assetList}/>
      </Layer>
      </div>
    </div>
  );
};

export default Canvas;