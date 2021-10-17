import React, { useState } from 'react'

import { ColorExtractor } from 'react-color-extractor'
import Draggable from 'react-draggable';


const DragablePicker = props => {
    var img = document.getElementById('image');
    const [location, setLocation] = useState(props.defaultLocation)
    const [color, setColor] = useState(props.defaultColor)
    const handleStart = (e, data) => {
        var img = document.getElementById('image');
        let bounds = img.getBoundingClientRect()
        console.log(bounds, data)
    }
    const handleDrag = (e, data) => {
        var img = document.getElementById('image');
        var handel = document.getElementById('handel');

        let bounds = img.getBoundingClientRect()
        let handelBound = data.node.getBoundingClientRect()
        console.log(bounds, handelBound)

        if (bounds.top <= handelBound.top &&
            bounds.left <= handelBound.top &&
            bounds.right >= handelBound.right &&
            bounds.bottom >= handelBound.bottom) {
            //the div is inside the canvas.
            setLocation({ x: handelBound.x - 100, y: handelBound.y - 60 })
            setColor(props.getPixelColor(handelBound.x - 90, handelBound.y - 100))

        }

    }


    return (


        <Draggable
            position={location}
            scale={1}
            // onStart={handleDrag}
            onStop={handleDrag}
        >
            <div id="handle" className="handle" style={{ backgroundColor: color }} />
        </Draggable>



    )

}
export default DragablePicker;
