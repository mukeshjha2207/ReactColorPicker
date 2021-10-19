import React, { useState, useEffect } from 'react'
import Draggable from 'react-draggable';


const DragablePicker = props => {
    var img = document.getElementById('image');
    const [location, setLocation] = useState(props.defaultLocation)
    const [color, setColor] = useState(props.defaultColor)

    useEffect(() => {
        setColor(props.defaultColor)
    }, [props.defaultColor])






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
        // console.log("bounds", bounds, handelBound)

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
            defaultPosition={location}
            scale={1}
            //bounds={{ left: 5, right: 670, top: 170, bottom: 0 }}
            onStart={handleDrag}
            onStop={handleDrag}
        >
            <div id="handle" className="handle" style={{ backgroundColor: color }} />
        </Draggable>



    )

}
export default DragablePicker;
