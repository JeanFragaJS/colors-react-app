import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import './Palette.css'; 
import "rc-slider/assets/index.css";


export default class Palette extends Component {
  constructor (props) {
    super(props);
    this.state = {level: 500};
    this.changeLevel =  this.changeLevel.bind(this); 
  }
  
  changeLevel (level) {
    this.setState({level});
    this.changeLevel =  this.changeLevel.bind(this);
  }

  render () {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map(color => ( <ColorBox background={color.hex} name={color.name}/> ));

    return (
      <div className='Palette'>

        <Slider 
          defaultValue={this.state.level} 
          min={100}
          max={900}
          step={100}
          onChange={this.changeLevel}
        />
        
        {/*NavBar*/}
        <div className='Palette-colors'>{colorBoxes}</div>
        {/*footer eventually*/}
      </div>
    )
  }
}; 