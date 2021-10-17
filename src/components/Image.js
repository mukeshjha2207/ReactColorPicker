import React, { useState } from 'react'

import { ColorExtractor } from 'react-color-extractor'
import Draggable from 'react-draggable';
import DragablePicker from './DragablePicker'

export const Image = props => {
  var img = document.getElementById('image');
  const [location, setLocation] = useState({ x: 0, y: 50 })
  const handleStart = (e, data) => {
    var img = document.getElementById('image');
    let bounds = img.getBoundingClientRect()
    console.log(bounds, data)



  }

  return props.error ? (
    <div className="error-message">
      An error occurred while processing the image.
    </div>
  ) : (
    <div>
      {props.colors.map((color, index) =>
        <DragablePicker defaultLocation={{ x: 0 + (index + 50), y: 180 + (index * 50) }} defaultColor={color} getPixelColor={props.getPixelColor} />
      )}
      <div className="image-container">
        <ColorExtractor getColors={props.getColors} onError={props.onError}>
          <img id="image" src={props.image} onMouseMove={(event) => {
            console.log(event)
            props.onCursurMove(event.pageX, event.pageY)
          }
          } />
        </ColorExtractor>

      </div >

    </div >
  )
}
