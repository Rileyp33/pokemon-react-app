import React from 'react';
import Select from 'react-select';

class InfoBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: null,
      options: []
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    console.log(`Option selected:`, selectedOption);
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

    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default InfoBox;
