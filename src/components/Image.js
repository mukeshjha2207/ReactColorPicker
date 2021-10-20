import React, { useEffect, useState } from 'react'

import DragablePicker from './DragablePicker'

export const Image = props => {

  const {
    error,
    image,
    colorFinder,
    setColor
  } = props;

  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (colorFinder !== null && colorFinder !== undefined) {
      setColors(colorFinder.mainColors())
    }
  }, [colorFinder])

  const img = document.getElementById('image');
  const layout = img?.getBoundingClientRect();

  return error ? (
    <div className="error-message">
      An error occurred while processing the image.
    </div>
  ) : (
    <div>
      {colors.map((color, index) =>
        <DragablePicker 
          key={index} 
          defaultLocation={colorFinder.locateColor(color, layout)} 
          defaultColor={color} 
          getPixelColor={(x, y) => colorFinder.colorAtPos(x, y, layout)} 
        />
      )}
      <div className="image-container">
        <img 
          id="image" 
          src={image} 
          onMouseMove={e => 
            setColor(colorFinder.colorAtPagePos(e.pageX, e.pageY, layout))
          }
        />
      </div >
    </div >
  )
}
