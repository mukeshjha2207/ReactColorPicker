import React from 'react'
import { Image as MyImage } from './components/Image'
import { Swatches } from './components/Swatches'
import { SearchInput } from './components/SearchInput'
import { FileInput } from './components/UploadButton'
import { SwatchesPicker } from 'react-color';

const IMAGE = 'https://i.imgur.com/OCyjHNF.jpg'

const Heading = props => <h1 className="heading">Image Color Extractor</h1>

export default class App extends React.Component {
  state = {
    image: IMAGE,
    colors: [],
    hasError: false,
    canvas: {
      width: 0,
      height: 0
    }
  }



  getCanvasImage = (x, y) => {

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
  }

  uploadFiles = e => {
    this.clearCanvas()
    this.setState({
      image: window.URL.createObjectURL(e.target.files[0]),
      hasError: false
    })
  }

  getColors = colors => {
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
    return (
      <div
        className="center-content"
        style={{
          flexDirection: 'column'
        }}
      >
        <Heading />
        <div style={{ backgroundColor: this.state.color }}> {this.state.color}</div>
        <MyImage
          error={this.state.hasError}
          image={this.state.image}
          getColors={this.getColors}
          // ImageLoad={() => this.getCanvasImage()}
          onCursurMove={(x, y) => this.setState({ color: this.getCanvasImage(x, y) })}
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
