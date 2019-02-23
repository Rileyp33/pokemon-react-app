import React from 'react';
import Select from 'react-select';
import StatsBox from './StatsBox'
import PokeChart from './PokeChart'
import Switch from "react-switch";

class InfoBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: [],
      selectedOption: null,
      pokeData: null,
      checked: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.fetchPokemon = this.fetchPokemon.bind(this)
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    this.fetchPokemon(selectedOption.value)
  }

  handleToggle() {
    this.setState({ checked: !this.state.checked });
    console.log(this.state.checked);
  }

  fetchPokemon(selection) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selection}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.text())
      .then(body => {
        return JSON.parse(body);
      })
      .then(parsedBody => {
        this.setState({ pokeData: parsedBody })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.text())
      .then(body => {
        return JSON.parse(body);
      })
      .then(parsedBody => {
        parsedBody.results.forEach(result => {
          let option = {}
          option["value"] = result.name
          option["label"] = result.name.charAt(0).toUpperCase() + result.name.slice(1, result.name.length)
          this.state.options.push(option)
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render() {
    const { selectedOption } = this.state;

    let image;
    if (this.state.pokeData) {
      image = this.state.pokeData.sprites.front_default
    }

    let name;
    if (this.state.selectedOption){
      name = selectedOption.label
    }

    let attackData;
    let attack;
    if (this.state.pokeData) {
      attackData = this.state.pokeData.stats.filter(s => {
        return s.stat.name === "attack"
      })
      attack = attackData[0].base_stat
    }

    let defenseData;
    let defense;
    if (this.state.pokeData) {
      defenseData = this.state.pokeData.stats.filter(s => {
        return s.stat.name === "defense"
      })
      defense = defenseData[0].base_stat
    }

    let speedData;
    let speed;
    if (this.state.pokeData) {
      speedData = this.state.pokeData.stats.filter(s => {
        return s.stat.name === "speed"
      })
      speed = speedData[0].base_stat
    }

    let typesData;
    let primaryType;
    let primaryTypeData;
    if (this.state.pokeData) {
      typesData = this.state.pokeData.types.map(type => {
        let types = {}
        types[type.slot] = type.type.name
        return types
      })
      primaryTypeData = this.state.pokeData.types.filter(type => type.slot === 1 )
      primaryType = primaryTypeData[0].type.name
    }

    let typesString = ""
    if (this.state.pokeData) {
      typesData.forEach(type => {
        if (type === typesData[typesData.length - 1]) {
          typesString += (Object.values([type][0]))
        }
        else {
          typesString += (Object.values([type][0]) + ", ")
        }
      })
    }
    typesString = typesString.charAt(0).toUpperCase() + typesString.slice(1, typesString.length)

    let statsBox;
    if (this.state.pokeData) {
      statsBox = <StatsBox
        image={image}
        types={typesString}
        attack={attack}
        defense={defense}
        speed={speed}
        name={name}
      />
    }

    let pokeChart;
    if (this.state.pokeData) {
      pokeChart = <PokeChart
        attack={attack}
        defense={defense}
        speed={speed}
        primaryType={primaryType}
      />
    }

    let moves;
    if (this.state.pokeData) {
      moves = this.state.pokeData.moves.map(move => {
        return (<div key={move.move.name} className="small-3 columns move-list">{move.move.name}</div>)
      })
    }

    let movesWithHeader =
    <div className="moves-area">
      <div className="moves-header">Moves</div>
      <br></br>
      {moves}
    </div>

    let chartArea;
    if (this.state.checked === false) {
      chartArea = pokeChart
    }
    else {
      chartArea = movesWithHeader;
    }

    let pokeSwitch;
    if (this.state.pokeData) {
      pokeSwitch =
      <label className="toggleSwitch">
        <span className="slider-text">Statistics &nbsp; &nbsp; </span>
        <Switch
          onChange={this.handleToggle}
          checked={this.state.checked}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#b30"
          />
        <span className="slider-text"> &nbsp; &nbsp; Moves</span>
      </label>
    }

    return (
      <div>
        <div className={"small-12 medium-12 large-4 columns callout info-box" + " " + primaryType}>
          <div className="search-header">Search for a Pokémon</div>
          <Select className='selector'
            value={selectedOption}
            onChange={this.handleChange}
            options={this.state.options}
          />
          <div>{statsBox}</div>
        </div>
        <div className="small-12 medium-12 large-8 columns callout pokechart">
          {pokeSwitch}
          {chartArea}
        </div>
      </div>
    );
  }
}

export default InfoBox;
