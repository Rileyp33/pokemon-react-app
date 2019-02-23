import React from 'react';

const StatsBox = props => {

  return(
    <div className="stats">
      <div className="callout image-name">
        <img className="poke-image" align="center" src={props.image}></img>
        <div className="poke-name">{props.name}</div>
      </div>
      <div className="stat">Types: {props.types}</div>
      <div className="stat">Attack: {props.attack}</div>
      <div className="stat">Defense: {props.defense}</div>
      <div className="stat">Speed: {props.speed}</div>
    </div>
  )
}

export default StatsBox;
