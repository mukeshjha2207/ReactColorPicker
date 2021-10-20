import React, { useState, useEffect } from 'react'
import Draggable from 'react-draggable';


const DragablePicker = props => {
    const [location, setLocation] = useState(props.defaultLocation)
    const [color, setColor] = useState(props.defaultColor)

    useEffect(() => {
        setLocation(props.defaultLocation)
        setColor(props.defaultColor)
    }, [props.defaultColor])
    
    const img = document.getElementById('image');
    const imgBounds = img.getBoundingClientRect();

    const handleDrag = (e, data) => {
        const handleBounds = document.getElementById('handle').getBoundingClientRect();
        const x = Math.min(
            imgBounds.width - handleBounds.width / 2,
            Math.max(-handleBounds.width / 2, data.x)
        );
        const y = Math.min(
            imgBounds.height - handleBounds.height / 2,
            Math.max(-handleBounds.height / 2, data.y)
        );
        const location = { x, y };
        setLocation(location);
        setColor(props.getPixelColor(
            x + handleBounds.width / 2, 
            y + handleBounds.height / 2
        ));
    }

    return (

        <Draggable
            position={location}
            onDrag={handleDrag}
        >
            <div id="handle" className="handle" style={{ backgroundColor: color, position: 'absolute' }} />
        </Draggable>
    )

}
export default DragablePicker;
