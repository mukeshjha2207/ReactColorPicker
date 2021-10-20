import React from 'react'
import { Image as MyImage } from './components/Image'
import { Swatches } from './components/Swatches'
import { SearchInput } from './components/SearchInput'
import { FileInput } from './components/UploadButton'
import { createCanvas, loadImage } from 'canvas'
import ColorFinder from 'color-finder'

const IMAGE = 'https://i.imgur.com/OCyjHNF.jpg'

const Heading = props => <h1 className="heading">Image Color Extractor</h1>

export default class App extends React.Component {

  state = {
    image: IMAGE,
    colorFinder: null,
    colors: [],
    color: '#000000',
    hasError: false,
  }

  updateImage () {
    const image = document.getElementById('image');
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = createCanvas(image.width, image.height);
      canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
      const colorFinder = new ColorFinder(canvas);
      this.setState({ 
        colorFinder: colorFinder,
        colors: colorFinder.mainColors
      });
    }
  }

  componentDidMount() {
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
    this.updateImage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.image !== prevState.image) {
      this.updateImage();
    }
  }

  uploadFiles = e => {
    this.setState({
      image: window.URL.createObjectURL(e.target.files[0]),
      hasError: false
    })
  }

  handleImage = e => {
    this.isResponseOk(e.target.value);
    const image = e.target.value;
    this.setState({ image: image });
  }

  isResponseOk = path =>
    fetch(path)
      .then(
        res => (res.status === 200 ? this.setState({ hasError: false }) : null)
      )
      .catch(err => (err ? this.setState({ hasError: true }) : null))


  render() {
    let { colorFinder, image, hasError } = this.state
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
          colorFinder={colorFinder}
          setColor={(color) => this.setState({ color: color })}
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
