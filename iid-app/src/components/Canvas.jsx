import React from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import useImage from 'use-image';
import AssetMenu from './AssetMenu';
import { ProgressBar } from 'react-bootstrap';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      draggable
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const Canvas = (props) => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  return (
    <div>
      <div
        onDrop={e => {
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current
              }
            ])
          );
        }}
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
          </Layer>
          <Layer>
            {images.map(image => {
              return <URLImage image={image} />;
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
        }}
        >
      <AssetMenu />
      </div>
    </div>
  );
};

export default Canvas;