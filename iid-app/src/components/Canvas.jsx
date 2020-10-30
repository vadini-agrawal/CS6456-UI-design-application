import React, {useEffect, forwardRef, useRef} from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
// import {Button} from "react-bootstrap";
import useImage from 'use-image';
import AssetMenu from './AssetMenu';
import {Spring, useSpring, animated} from 'react-spring';
import TrashCanImage from './TrashCanImage';
import '../style/AssetMenu.css';
import Modal from 'react-bootstrap/Modal';

const URLImage = ({key, image, height, width, onDragEnd, onDragStart, originalX, originalY, onDblClick, iswallasset }) => {
  const [img] = useImage(image.src);
  // let image_node = React.useRef();
  // const y_coord = image.y;
  // const [spring] = useSpring({y: 10, from: {y: y_coord}})
  // const image_component = 
  // const AnimatedImage = animated(image_component)

  return (
    <Image
      key={key}
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

const Input = forwardRef(({value, handleChange}, ref) => (
  <input
    type="number"
    value={value}
    onChange={handleChange}
    ref={ref}
    />
));


const Canvas = (props) => {
  const dragUrl = React.useRef();
  const imgHeight = React.useRef();
  const imgWidth = React.useRef();
  const stageRef = React.useRef();
  const isWallAsset = React.useRef();
  const [images, setImages] = React.useState([]);
  const test = [10,70, 130];
  const [modalChangeSize, changeSize] = React.useState(false);
  const image_node = React.useRef();
  const [newWidth, changeWidth] = React.useState(0);
  const [newHeight, changeHeight] = React.useState(0);
  const [currentImageResizing, changeImageforSizing] = React.useState();
  const [oldHeight, changeOldHeight] = React.useState(0);
  const [oldWidth, changeOldWidth] = React.useState(0);

  const handleChangeWidth = event => changeWidth(event.target.value);
  const handleChangeHeight = event => changeHeight(event.target.value);

  const ref = React.useRef();

  // useEffect(() => ref.current.focus(), []);

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
    // console.log(this.image_node);
    // this.image_node.to({
    //   scaleX: Math.random() + 1.4,
    //   scaleY: Math.random() + 1.4,
    //   duration: 0.2
    // });
  }
  
  const handleDragStart = (e) => {
    console.log("Drag Start");
    console.log(e);
  }

  const handleDoubleClk = (e) => {
    console.log("doubleClick");
    console.log(e);
    // props.assetSizeHandler(e.currentTarget);
    changeHeight(e.currentTarget.attrs.height);
    changeWidth(e.currentTarget.attrs.width);
    changeOldHeight(e.currentTarget.attrs.height);
    changeOldWidth(e.currentTarget.attrs.width);
    changeImageforSizing(e.currentTarget);
    changeSize(true);
  }

  const handleModalClose = (e) => {
    changeSize(false);
  }

  const  handleSizeSubmit = (e) => {
    console.log(newWidth);
    console.log(newHeight);
    var imagesTemp = images.filter(item => (item.x !== currentImageResizing.attrs.x|| item.y !== currentImageResizing.attrs.y
      || item.src !== currentImageResizing.attrs.image.currentSrc || item.width !== currentImageResizing.attrs.width 
      || item.height !== currentImageResizing.attrs.height));

    console.log("currentImage");
    console.log(currentImageResizing);
    currentImageResizing.attrs.height = parseInt(newHeight);
    currentImageResizing.attrs.width = parseInt(newWidth);
    console.log("imagesTemp");
    console.log(imagesTemp);
    var imagesTemp2 = [{
      x: currentImageResizing.attrs.x,
      y: currentImageResizing.attrs.y,
      src: currentImageResizing.attrs.image.currentSrc,
      width: currentImageResizing.attrs.width,
      height: currentImageResizing.attrs.height
    }];
    imagesTemp2 = imagesTemp2.concat(imagesTemp);
    console.log("imagesTemp2");
    console.log(imagesTemp2);
    
    setImages(imagesTemp2);


    console.log(images);
    // reloadImages();
    // setImages(images.concat([{
    //   x: currentImageResizing.attrs.x,
    //   y: currentImageResizing.attrs.y,
    //   src: currentImageResizing.attrs.image.currentSrc,
    //   width: currentImageResizing.attrs.width,
    //   height: currentImageResizing.attrs.height
    // }]));
    handleModalClose();
  }

  const reloadImages = () => {
    setImages(images.concat([{
      x: currentImageResizing.attrs.x,
      y: currentImageResizing.attrs.y,
      src: currentImageResizing.attrs.image.currentSrc,
      width: currentImageResizing.attrs.width,
      height: currentImageResizing.attrs.height
    }]));
  }
  
  // const asyncHandleSizeSubmit = (e) =>setTimeout(handleSizeSubmit, 0);

  const handleOnDrop = (e) => {

    console.log(image_node.current);
    // register event position
    stageRef.current.setPointersPositions(e);

    // add image
    if (stageRef.current.getPointerPosition().x > (0) &&
        stageRef.current.getPointerPosition().x < (props.width - 50) && 
        stageRef.current.getPointerPosition().y > 0 && 
        stageRef.current.getPointerPosition().y < 50) 
    {
    } else {
      // if (isWallAsset.current === "false") {
      //   setImages(
      //     images.concat([
      //       {
      //         x: stageRef.current.getPointerPosition().x,
      //         y: props.height - imgHeight.current + 3,
      //         src: dragUrl.current,
      //         height: imgHeight.current,
      //         width: imgWidth.current,
      //         iswallasset: isWallAsset.current,
      //       }
      //     ])
      //   );
      // } else {
        setImages(
          images.concat([
            {
              ...stageRef.current.getPointerPosition(),
              src: dragUrl.current,
              height: imgHeight.current,
              width: imgWidth.current,
              iswallasset: isWallAsset.current,
            }
          ])
        );      // }
    }
  }

  if (props.clearWall == true && images.length != 0){
    images.splice(0, images.length);
  }
  return (
    <div>
      <div
        id = "divToPrint"
        className = "mt4"
        onDrop={handleOnDrop}
        onDragOver={e => e.preventDefault()}
      >
        {/* <Input value={newWidth} handleChange={handleChangeWidth} ref={ref} /> */}

        <Modal show={modalChangeSize} onHide={e => handleModalClose(e)}>
        <label>Enter Width</label>
        <Input value={newWidth} handleChange={handleChangeWidth} ref={ref} />
        <label>Enter Height</label>
        <Input value={newHeight} handleChange={handleChangeHeight} ref={ref} />
        <button onClick={e => handleSizeSubmit(e)} type="button">
          Save
        </button>
        </Modal>
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
        {images.map(image => {
            return <URLImage 
                image={image} 
                height={image.height} 
                width={image.width} 
                onDragEnd={handleDragEnd} 
                onDragStart={handleDragStart} 
                originalX={image.x} 
                originalY={image.y} 
                onDblClick={handleDoubleClk}/>;
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
          image_node.current = e.target;
          dragUrl.current = e.target.src;
          imgHeight.current = e.target.height;
          imgWidth.current = e.target.width;
          isWallAsset.current = e.target.dataset.iswallasset;
        }}>
        <Layer>
          <AssetMenu assetList = {props.assetList}/>
        </Layer>
        </div>
    </div>
  );
};

export default Canvas;