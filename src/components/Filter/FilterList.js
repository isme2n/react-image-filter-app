import React, { Component } from 'react';
import FilterBox from './FilterBox'
import * as filter from '../../util/filter';

class FilterList extends Component {

  adjustFilter(func){
    this.props.filter(func);
  }

  render(){
    return (
      <div style={{display:'inline'}}>
        {this.props.img ? Object.keys(filter).map((key) => (<span key={key} onClick={this.adjustFilter.bind(this,filter[key])}><FilterBox func={filter[key]} img={this.props.img}/></span>))
           :null}
      </div>
    )
  }
};

export default FilterList;
