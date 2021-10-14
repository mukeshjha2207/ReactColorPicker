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

  componentDidMount() {
    this.updateCanvas()
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
    }, this.updateCanvas)
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


  clearCanvas = () => {
    const ctx = this.refs.canvas.getContext('2d');
    let { width, height, xOffset, yOffset } = this.canvas

    ctx.clearRect(xOffset, yOffset, width, height);
  }
  updateCanvas = () => {
    this.canvas = {}
    const ctx = this.refs.canvas.getContext('2d');
    var imageObj1 = new Image();
    imageObj1.src = this.state.image
    imageObj1.onload = function () {
      var canvas = document.getElementById('canvas');
      var wrh = imageObj1.width / imageObj1.height;
      var newWidth = canvas.width;
      var newHeight = newWidth / wrh;
      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = newHeight * wrh;
      }
      var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
      var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

      let canvaswh = { width: newWidth, height: newHeight, xOffset, yOffset }

      canvas = canvaswh

      ctx.drawImage(imageObj1, xOffset, yOffset, newWidth, newHeight);

    }

  }


  render() {


    return (
      <div
        className="center-content"
        style={{
          flexDirection: 'column'
        }}
      >
        <Heading />
        <canvas ref="canvas" id="canvas" className="canvas" />

        <MyImage
          error={this.state.hasError}
          image={this.state.image}
          getColors={this.getColors}
          onError={error => this.setState({ hasError: true })}
        />
        <SearchInput
          imagePath={this.state.image === IMAGE ? '' : this.state.image}
          handleImage={this.handleImage}
          getColors={this.getColors}
        />
        <FileInput uploadFiles={this.uploadFiles} />
        {this.state.colors.length > 0 ? (
          <Swatches colors={this.state.colors} />
        ) : null}

      </div>
    )
  }
}
