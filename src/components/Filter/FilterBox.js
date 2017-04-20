import React , {Component} from 'react';

var ctx,canvas;
class FilterBox extends Component {
  componentDidMount() {
        canvas = this.refs.canvas;
        ctx = canvas.getContext('2d');
        this.drawImageData(this.props.img);
    }


  drawImageData(image) {
      image.height *= canvas.offsetWidth / image.width;
      image.width = canvas.offsetWidth;

      if(image.height > canvas.offsetHeight){
          image.width *= canvas.offsetHeight / image.height;
          image.height = canvas.offsetHeight;
      }

      ctx.drawImage(image, 0, (canvas.offsetHeight-image.height)/2, image.width, image.height);
      // image processing
      var filteredData = this.props.func(ctx.getImageData(0,0, canvas.width, canvas.height));
      // Canvas에 다시 그린다.
      ctx.putImageData(filteredData, 0 , 0);
  }

    render(){
      return (
        <canvas id="canvas" ref="canvas" width="200" height="200"></canvas>
    );
  }
};

export default FilterBox;
