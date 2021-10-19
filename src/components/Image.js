import React, { useEffect, useState } from 'react'

import { ColorExtractor } from 'react-color-extractor'
import DragablePicker from './DragablePicker'

export const Image = props => {
  var img = document.getElementById('image');
  const [color, setColor] = useState(props.colors)


  useEffect(() => {
    console.log("useEffect called", props.colors)
    setColor(props.colors)
  }, [props.colors])

  // const handleStart = (e, data) => {
  //   var img = document.getElementById('image');
  //   let bounds = img.getBoundingClientRect()
  //   console.log(bounds, data)
  // }

  return props.error ? (
    <div className="error-message">
      An error occurred while processing the image.
    </div>
  ) : (
    <div>
      {color.map((color, index) =>// dummy location need to get the actual one from image
        <DragablePicker key={index.toString()} defaultLocation={{ x: 0 + (index + 50), y: 180 + (index * 50) }} defaultColor={color} getPixelColor={props.getPixelColor} />
      )}
      <div className="image-container">
        <ColorExtractor getColors={props.getColors} onError={props.onError}>
          <img id="image" src={props.image} onMouseMove={(event) => {
            //  console.log(event)
            // var canvas = document.createElement('canvas');
            props.onCursurMove(event.pageX, event.pageY)
          }
          } />
        </ColorExtractor>

      </div >

    </div >
  )
}
