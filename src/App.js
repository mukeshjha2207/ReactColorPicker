import React from 'react'
import { Image as MyImage } from './components/Image'
import { Swatches } from './components/Swatches'
import { SearchInput } from './components/SearchInput'
import { FileInput } from './components/UploadButton'
import Draggable from 'react-draggable';


const IMAGE = 'https://i.imgur.com/OCyjHNF.jpg'

const Heading = props => <h1 className="heading">Image Color Extractor</h1>

export default class App extends React.Component {
  state = {
    image: IMAGE,
    colors: [],
    bounds: [],
    hasError: false,
    canvas: {
      width: 0,
      height: 0
    }
  }




  getPixelColor = (x, y) => {
    var img = document.getElementById('image');
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    img.crossOrigin = 'anonymous';
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    let color = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    color = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
    return color

  }


  componentDidMount() {
    //this.getCanvasImage()

    const searchInput = document.getElementById('s-input')

    searchInput.focus()

    const uploader = document.getElementById('uploader')
    const button = document.getElementById('file-upload')

    button.addEventListener('click', e => {
      if (uploader) {
        uploader.click()
      }

      e.preventDefault()
    })

    var img = document.getElementById('image');
    let bounds = img.getBoundingClientRect()
    this.setState({ bounds })
  }

  uploadFiles = e => {
    this.setState({
      image: window.URL.createObjectURL(e.target.files[0]),
      hasError: false
    })
  }

  getColors = colors => {
    console.log("getColors", colors)
    this.setState(state => ({ colors: [...colors], hasError: false }))
  }

  handleImage = e => {
    this.isResponseOk(e.target.value)
    this.setState({ image: e.target.value })
  }

  isResponseOk = path =>
    fetch(path)
      .then(
        res => (res.status === 200 ? this.setState({ hasError: false }) : null)
      )
      .catch(err => (err ? this.setState({ hasError: true }) : null))


  render() {
    let { colors, image, hasError } = this.state
    return (
      <div
        className="center-content"
        style={{
          flexDirection: 'column'
        }}
      >
        <Heading />
        <div style={{ backgroundColor: this.state.color, padding: 20, marginBottom: 20, color: 'grey' }}> {this.state.color} </div>
        <MyImage
          error={hasError}
          image={image}
          getColors={this.getColors}
          getPixelColor={this.getPixelColor}
          colors={colors}
          onCursurMove={(x, y) => this.setState({ color: this.getPixelColor(x, y) })}
          onError={error => this.setState({ hasError: true })}
        />

        <SearchInput
          imagePath={this.state.image === IMAGE ? '' : this.state.image}
          handleImage={this.handleImage}
          getColors={this.getColors}
        />
        <FileInput uploadFiles={this.uploadFiles} />
        {
          this.state.colors.length > 0 ? (
            <Swatches colors={this.state.colors} />
          ) : null
        }

      </div >
    )
  }
}
