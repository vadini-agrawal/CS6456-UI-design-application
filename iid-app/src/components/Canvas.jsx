import React from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import useImage from 'use-image';
import AssetMenu from './AssetMenu';
import Asset from './Asset';
import { ProgressBar } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';


const URLImage = ({ image, height, width }) => {
  const [img] = useImage(image.src);
  console.log(image);
  console.log(height);
  console.log(width);
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
    />
  );
};

const Canvas = (props) => {
  const dragUrl = React.useRef();
  const imgHeight = React.useRef();
  const imgWidth = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const handleDragEnd = (e) => {
    dragUrl.current = e.target.src;
    console.log('here');
    console.log(e);
  }
  
  //console.log(props.assetList);
  if (props.clearWall == true && images.length != 0){
    images.splice(0, images.length);
  }
  return (
    <div>
      <div
        onDrop={e => {
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          console.log(stageRef.current.getPointerPosition());
          if (stageRef.current.getPointerPosition().x > (props.width - 50) &&
              stageRef.current.getPointerPosition().x < props.width && 
              stageRef.current.getPointerPosition().y > 0 && 
              stageRef.current.getPointerPosition().y < 50) {
                console.log("trash");
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
              }}
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
            <Rect
                x={props.width - 50}
                y={0}
                height = {50}
                width = {50}
                fill = "grey" 
              />
          </Layer>
          <Layer>
            {images.map(image => {
              return <URLImage image={image} height={image.height} width={image.width} onDragEnd={handleDragEnd}/>;
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