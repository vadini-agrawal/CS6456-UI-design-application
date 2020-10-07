import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import test from '../images/test.jpg';
import Asset from './Asset';
import AssetMenu from './AssetMenu';

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
      Try to trag and image into the stage:
      <br />
      <div 
        onDragStart={e => {
          dragUrl.current = e.target.src;
        }}
        >
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
      />
      <Asset image_url={test} width={10} height={10} />
      <AssetMenu />
      </div>
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
            {images.map(image => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;