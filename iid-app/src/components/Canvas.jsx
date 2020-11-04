import React, {useEffect} from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
// import {Button} from "react-bootstrap";
import useImage from 'use-image';
import AssetMenu from './AssetMenu';
import {Spring, useSpring, animated} from 'react-spring';
import TrashCanImage from './TrashCanImage';
import '../style/AssetMenu.css';
import Modal from 'react-bootstrap/Modal';

const URLImage = ({id, src, x, y, height, width, onDragEnd, onDragStart, originalX, originalY, onDblClick, iswallasset }) => {
  const [img] = useImage(src);
  // let image_node = React.useRef();
  // const y_coord = image.y;
  // const [spring] = useSpring({y: 10, from: {y: y_coord}})
  // const image_component = 
  // const AnimatedImage = animated(image_component)

  return (
    <Image
      id = {id}
      image={img}
      x={x}
      y={y}
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
      iswallasset = {iswallasset}
      onDblClick = {onDblClick}
    />
  );
};


const Canvas = (props) => {
  const dragUrl = React.useRef();
  const imgHeight = React.useRef();
  const imgWidth = React.useRef();
  const stageRef = React.useRef();
  const isWallAsset = React.useRef();
  const [images, setImages] = React.useState([]);
  const test = [10,70, 130];
  const [modalChangeSize, changeSize] = React.useState(false);
  const [modalInputHeight, changeHeight] = React.useState(0);
  const [modalInputWidth, changeWidth] = React.useState(0);
  const image_node = React.useRef();
  var [rerender, changeRender] = React.useState(false);
  
  useEffect(() => {
    if (!images) {
      console.log('run something here');
    }
  }, [images]);


  const findLowestY = (new_images, x, height, width, id) => {
    var lowestY = props.height;
    var min_x = x;
    var max_x = x + width;

    let i = 0;
    for (i = 0; i < new_images.length; i++) {
      var img_min = new_images[i].props.x;
      var img_max = new_images[i].props.width + new_images[i].props.x;
      var img_y = new_images[i].props.y;
      if (max_x > img_min && min_x < img_max) {
        if (new_images[i].props.iswallasset === "false") {
          if (new_images[i].props.id !== id) {
            if (img_y < lowestY) {
              lowestY = img_y;
            }
          }
        }
      }
    } 
    return lowestY - height;
  };

  const moveHigherImages = (images) => {
    let i = 0;
    let new_images = images;
    for (i = 0; i < new_images.length; i++) {
      let lowestY = findLowestY(new_images, new_images[i].props.x, new_images[i].props.height, new_images[i].props.width, new_images[i].props.id);
      if (new_images[i].props.y < lowestY) {
        let img_props = Object.assign({}, new_images[i].props);
        let new_image = new_images[i];
        new_image.to({
          y: lowestY,
        });
        let img = <URLImage id={img_props.id} src={img_props.src} x={img_props.x} y={lowestY} onDragEnd={handleDragEnd} 
        onDragStart={handleDragStart} onDblClick={handleDoubleClk} height={img_props.height} width={img_props.width} originalX={img_props.originalX} originalY={img_props.originalY} />
        new_images[i] = img;
      }
    }
    return new_images;
  }

  const findImageId = (id) => {
    let i = 0; 

    for (i = 0; i < images.length; i++) {
      if (images[i].props.id === id) {
        return i;
      }
    }

    console.log("COULDNT FIND THE IMAGE");
    return 0;
  }

  const handleDragEnd = (e) => {
    if (e.target.attrs.x < 50 && e.target.attrs.y < 50) {
      setImages(images.filter(item => (item.x !== e.target.attrs.originalX || item.y !== e.target.attrs.originalY 
        || item.src !== e.target.attrs.image.currentSrc)));
      } 
    else {
      // if (e.target.attrs.x > 0 && 
      //   e.target.attrs.y < props.height && 
      //   e.target.attrs.x < props.width) {
          console.log(e.target);
          console.log(images);
          var new_images = images;
          let ind = findImageId(e.target.attrs.id);
          var img_props =  Object.assign({}, new_images[ind].props);
          // console.log(img_props);
          // img_props.x = e.target.attrs.x;
          // img_props.y = e.target.attrs.y;
          var new_image = <URLImage id={img_props.id} src={img_props.src} x={e.target.attrs.x} y={e.target.attrs.y} onDragEnd={handleDragEnd} 
          onDragStart={handleDragStart} onDblClick={handleDoubleClk} height={img_props.height} width={img_props.width} originalX={img_props.originalX} originalY={img_props.originalY} />
          new_images[ind] = new_image;
          let lowestFloor = findLowestY(new_images, e.target.attrs.x, img_props.height, img_props.width, img_props.id);
          var new_images2 = images;
          let ind2 = findImageId(e.target.attrs.id);
          var img2_props = Object.assign({}, new_images2[ind2].props);
          // img2_props.x = e.target.attrs.x;
          // img2_props.y = lowestFloor;
          new_images2[ind2] =<URLImage id={img2_props.id} src={img2_props.src} x={e.target.attrs.x} y={lowestFloor} onDragEnd={handleDragEnd} 
          onDragStart={handleDragStart} onDblClick={handleDoubleClk} height={img2_props.height} width={img2_props.width} originalX={img_props.originalX} originalY={img2_props.originalY} />;
          if (e.target.attrs.iswallasset === "true") {
            setImages(new_images);
          } else {
            let newest_images = moveHigherImages(new_images2);
            setImages(newest_images);
            e.target.to({
              y: lowestFloor,
            });
          }
          console.log(images);
        // }
    }
    // console.log(this.image_node);
  }
  
  const handleDragStart = (e) => {
    // console.log("Drag Start");
    // console.log(e);
  }

  const handleDoubleClk = (e) => {
    console.log("doubleClick");
    console.log(e);
    props.assetSizeHandler(e.currentTarget);
    changeSize(true);
  }

  
  const handleOnDrop = (e) => {

    console.log(image_node.current);
    // register event position
    stageRef.current.setPointersPositions(e);

    // add image
    if (stageRef.current.getPointerPosition().x > (0) &&
        stageRef.current.getPointerPosition().x < (50) && 
        stageRef.current.getPointerPosition().y > 0 && 
        stageRef.current.getPointerPosition().y < 50) 
    {
    } else {
      if (isWallAsset.current === "false") {
        console.log("FLOOOR ASSSET");
        // console.log(images);
        var lowestY = findLowestY(images, stageRef.current.getPointerPosition().x, imgHeight.current, imgWidth.current);
        var nextImg = [
          <URLImage 
            id={dragUrl.current + stageRef.current.getPointerPosition().x.toString() + lowestY.toString()}
            x={stageRef.current.getPointerPosition().x} 
            y={lowestY} 
            src={dragUrl.current}
            height={imgHeight.current}
            width={imgWidth.current}
            onDragEnd={handleDragEnd} 
            onDragStart={handleDragStart} 
            originalX={stageRef.current.getPointerPosition().x} 
            originalY={lowestY} 
            onDblClick={handleDoubleClk}
            iswallasset={isWallAsset.current}
          />]
        setImages(
          images.concat(nextImg)
        );
          // images.concat([
          //   {
          //     id: dragUrl.current + stageRef.current.getPointerPosition().x.toString() + lowestY.toString(),
          //     x: stageRef.current.getPointerPosition().x,
          //     y: lowestY,
          //     src: dragUrl.current,
          //     height: imgHeight.current,
          //     width: imgWidth.current,
          //     iswallasset: isWallAsset.current,
          //   }
          // ])
      } else {
        console.log("NOT A FLOOR ASSETTTT");
        console.log(isWallAsset.current);
        console.log(false);
        setImages(
          images.concat(
            <URLImage 
              id={dragUrl.current + stageRef.current.getPointerPosition().x.toString() + lowestY.toString()}
              src={dragUrl.current}
              x={stageRef.current.getPointerPosition().x} 
              y={stageRef.current.getPointerPosition().y} 
              height={imgHeight.current}
              width={imgWidth.current}
              onDragEnd={handleDragEnd} 
              onDragStart={handleDragStart} 
              originalX={stageRef.current.getPointerPosition().x} 
              originalY={stageRef.current.getPointerPosition().x} 
              onDblClick={handleDoubleClk}
              iswallasset={isWallAsset.current}
            />
          )
          // images.concat([
          //   {
          //     id: dragUrl.current + stageRef.current.getPointerPosition().x.toString() + stageRef.current.getPointerPosition().y.toString(),
          //     ...stageRef.current.getPointerPosition(),
          //     src: dragUrl.current,
          //     height: imgHeight.current,
          //     width: imgWidth.current,
          //     iswallasset: isWallAsset.current,
          //   }
          // ])
        );      // }
    }
    // console.log(images);
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
            console.log(image);
            return image;
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