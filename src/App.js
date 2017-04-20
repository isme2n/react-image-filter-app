import React, { Component } from 'react';
import './App.css';
import FilterList from './components/Filter/FilterList';
import { Container, Header, Button } from 'semantic-ui-react';


var ctx,canvas;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      img : false
    }

    this.filter = this.filter.bind(this);
    this.restore = this.restore.bind(this);
  }
  componentDidMount() {
    canvas = this.refs.canvas;
    ctx = canvas.getContext('2d');
  }

  drawImageData(image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.calcSize(image);

    ctx.drawImage(image, 0, (canvas.offsetHeight-image.height)/2, image.width, image.height);
  }

  calcSize(image){
    image.height *= canvas.offsetWidth / image.width;
    image.width = canvas.offsetWidth;

    if(image.height > canvas.offsetHeight){
        image.width *= canvas.offsetHeight / image.height;
        image.height = canvas.offsetHeight;
    }
  }

  imageLoad(e) {
    this.setState({
      img:null
    });

    var file = e.target.files[0];
    var fileReader = new FileReader();

    var self = this;
    fileReader.onload = function (e) {
        var image = new window.Image();
        image.src = e.target.result;
        self.setState({
          img : image
        })
        image.onload = function () {
            self.drawImageData(image);
        }
    };

    fileReader.readAsDataURL(file);
  }

  restore(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.calcSize(this.state.img);

    ctx.drawImage(this.state.img, 0, (canvas.offsetHeight-this.state.img.height)/2, this.state.img.width, this.state.img.height);
  }

  filter(func) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.calcSize(this.state.img);

    ctx.drawImage(this.state.img, 0, (canvas.offsetHeight-this.state.img.height)/2, this.state.img.width, this.state.img.height);
    // imageData를 가져온다.
    var pixels = ctx.getImageData(0,0, canvas.width, canvas.height);

    // image processing
    var filteredData = func(pixels);

    // Canvas에 다시 그린다.
    ctx.putImageData(filteredData, 0 , 0);
  }

  render() {
    return (
      <Container fluid className="App">
        <Container fluid className="App-header">
          <Header as='h2' style={{color:'#fff'}}>React Image Filter</Header>
        </Container>
        <Container fluid>
          <canvas id="canvas" ref="canvas" width="500" height="500"></canvas><br/>
          <input id="loadButton" onChange={this.imageLoad.bind(this)} type="file" accept="image/*"/>
          <Button id="restoreButton" onClick={this.restore}>원본보기</Button>
        </Container>
        <Container fluid>
          {this.state.img ?<FilterList filter={this.filter} img={this.state.img}/> :null}
        </Container>
      </Container>
    );
  }
}

export default App;
