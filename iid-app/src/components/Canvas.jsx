import React, {useEffect} from 'react';
import { Stage, Layer, Image, Rect} from 'react-konva';
// import {Button} from "react-bootstrap";
import useImage from 'use-image';
import AssetMenu from './AssetMenu';
import TrashCanImage from './TrashCanImage';
//Audio 
import TrashSound from '../images/trash.mp3';
import DropSound from '../images/drop.mp3';
import HeavyDrop from '../images/heavy_drop.mp3';
import WallDrop from '../images/wall_drop.mp3';

import '../style/AssetMenu.css';

const URLImage = ({id, image, height, width, onDragEnd, onDragStart, originalX, originalY, onDblClick, iswallasset }) => {
  const [img] = useImage(image.src);
  // let image_node = React.useRef();
  // const y_coord = image.y;
  // const [spring] = useSpring({y: 10, from: {y: y_coord}})
  // const image_component = 
  // const AnimatedImage = animated(image_component)

  return (
    <Image
      id={id}
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
      iswallasset = {iswallasset}
      onDblClick = {onDblClick}
    />
  );
};

const BackgroundImage = ({wallImage, width, height}) => {
  const [backgroundImage] = useImage(wallImage);
  return (
  <Image 
    image={backgroundImage} 
    width={width} 
    height={height} 
    x={0}
    y={0} 
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
  const [nodes, setNodes] = React.useState([]);

  
  useEffect(() => {
    if (!images) {
      console.log('run something here');
    }
  }, [images]);


  const findLowestY = (new_images, x, height, width, id) => {
    var lowestY = props.height - 15;
    var min_x = x - width / 2;
    var max_x = x + width - width / 2;

    let i = 0;
    for (i = 0; i < new_images.length; i++) {
      var img_min = new_images[i].x - new_images[i].width / 2
      var img_max = new_images[i].width + new_images[i].x - new_images[i].width / 2;
      var img_y = new_images[i].y;
      if (max_x > img_min && min_x < img_max) {
        if (new_images[i].iswallasset === "false") {
          if (new_images[i].id !== id) {
            if (img_y < lowestY) {
              lowestY = img_y - new_images[i].height / 4;
            }
          }
        }
      }
    } 
    return lowestY - height + height / 4;
  };

  // const moveHigherImages = (images) => {
  //   // let i = 0;
  //   // let new_images = images;
  //   // for (i = 0; i < new_images.length; i++) {
  //   //   let lowestY = findLowestY(new_images, new_images[i].x, new_images[i].height, new_images[i].width, new_images[i].id);
  //   //   if (new_images[i].y < lowestY) {
  //   //     let img = new_images[i];
  //   //     img.y = lowestY;
  //   //     new_images[i] = img;
  //   //   }
  //   return images;
  // }

  const findImageId = (id) => {
    let i = 0; 

    for (i = 0; i < images.length; i++) {
      if (images[i].id === id) {
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
        const trash = document.getElementById("trash_audio");
        trash.play();
      } 
    else {
      if (e.target.attrs.x > 0 && 
        e.target.attrs.y < props.height || 
        e.target.attrs.x < props.width) {
          var new_images = images;
          let ind = findImageId(e.target.attrs.id);
          var img = new_images[ind];
          img.x = e.target.attrs.x;
          img.y = e.target.attrs.y;
          new_images[ind] = img;
          let lowestFloor = findLowestY(new_images, e.target.attrs.x, img.height, img.width, img.id);
          var new_images2 = images;
          let ind2 = findImageId(e.target.attrs.id);
          var img2 = new_images2[ind2];
          img2.x = e.target.attrs.x;
          img2.y = lowestFloor;
          new_images2[ind2] = img2;
          if (e.target.attrs.iswallasset === "true") {
            setImages(new_images);
          } else {
            setImages(new_images2)
            e.target.to({
              y: lowestFloor,
            });
            const drop = document.getElementById("drop_audio");
            drop.play();
          }
          console.log(images);
        }
    }
  }
  
  const handleDragStart = (e) => {
  }

  const handleDoubleClk = (e) => {
    console.log("doubleClick");
    console.log(e);
    props.assetSizeHandler(e.currentTarget);
  }

  
  const handleOnDrop = (e) => {

    // register event position
    stageRef.current.setPointersPositions(e);

    // add image
    if (stageRef.current.getPointerPosition().x > (0) &&
        stageRef.current.getPointerPosition().x < 50 && 
        stageRef.current.getPointerPosition().y > 0 && 
        stageRef.current.getPointerPosition().y < 50) 
    {
      const trash = document.getElementById("trash_audio");
      trash.play();
    } else {
      if (isWallAsset.current === "false") {
        var lowestY = findLowestY(images, stageRef.current.getPointerPosition().x, imgHeight.current, imgWidth.current);
        setImages(
          images.concat([
            {
              id: dragUrl.current + stageRef.current.getPointerPosition().x.toString() + lowestY.toString(),
              x: stageRef.current.getPointerPosition().x,
              y: lowestY,
              src: dragUrl.current,
              height: imgHeight.current,
              width: imgWidth.current,
              iswallasset: isWallAsset.current,
            }
          ])
        );
        if (imgHeight.current / 12 > 10 || imgWidth.current / 12 > 10) {
          const heavy = document.getElementById("heavy_drop");
          heavy.play();
        } else {
          const drop = document.getElementById("drop_audio");
          drop.play();
        }
      } else {
        setImages(
          images.concat([
            {
              ...stageRef.current.getPointerPosition(),
              id: dragUrl.current + stageRef.current.getPointerPosition().x.toString() + stageRef.current.getPointerPosition().y.toString(),
              src: dragUrl.current,
              height: imgHeight.current,
              width: imgWidth.current,
              iswallasset: isWallAsset.current,
            }
          ])
        );  
        const wall = document.getElementById("wall_drop");
        wall.play();
    }
  }
  }

  if (props.clearWall === true && images.length !== 0){
    images.splice(0, images.length);
  }

  return (
    <div>
      <audio id="trash_audio">
        <source src={TrashSound}></source>
      </audio>
      <audio id="drop_audio">
        <source src={DropSound}></source>
      </audio>
      <audio id="heavy_drop">
        <source src={HeavyDrop}></source>
      </audio>
      <audio id="wall_drop">
        <source src={WallDrop}></source>
      </audio>
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
          {props.wallImage ? 
          
          <BackgroundImage width={props.width} height={props.height} wallImage={props.wallImage} /> :
          <Rect x={0} y={0} width={props.width} height={props.height} fill={props.wallColor}/>
          }
          <TrashCanImage
            x = {0}
            y = {0}
            />
        </Layer>
        <Layer>
        {images.map(image => {
            return <URLImage 
            id={image.id}
            image={image} 
            height={image.height} 
            width={image.width} 
            onDragEnd={handleDragEnd} 
            onDragStart={handleDragStart} 
            originalX={image.x} 
            originalY={image.y} 
            onDblClick={handleDoubleClk}
            iswallasset={image.iswallasset}/>
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
          // image_node.current = e.target;
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