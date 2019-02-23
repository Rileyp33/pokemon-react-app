import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

class PokeChart extends Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: []
    }
  }

  componentDidMount() {
    this.setState({ chartData:
      [{
        name: 'Attack', Rating: this.props.attack
      },
      {
        name: 'Defense', Rating: this.props.defense
      },
      {
        name: 'Speed', Rating: this.props.speed
      }]
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ chartData:
      [{
        name: 'Attack', Rating: nextProps.attack
      },
      {
        name: 'Defense', Rating: nextProps.defense
      },
      {
        name: 'Speed', Rating: nextProps.speed
      }]
    })
  }

  render() {
    let fill;
    if (this.props.primaryType === "normal") {
      fill = "#A8A77A"
    }
    if (this.props.primaryType === "fire") {
      fill = "#EE8130"
    }
    if (this.props.primaryType === "water") {
      fill = "#6390F0"
    }
    if (this.props.primaryType === "electric") {
      fill = "#F7D02C"
    }
    if (this.props.primaryType === "grass") {
      fill = "#7AC74C"
    }
    if (this.props.primaryType === "ice") {
      fill = "#96D9D6"
    }
    if (this.props.primaryType === "fighting") {
      fill = "#C22E28"
    }
    if (this.props.primaryType === "poison") {
      fill = "#A33EA1"
    }
    if (this.props.primaryType === "ground") {
      fill = "#E2BF65"
    }
    if (this.props.primaryType === "flying") {
      fill = "#A98FF3"
    }
    if (this.props.primaryType === "psychic") {
      fill = "#F95587"
    }
    if (this.props.primaryType === "bug") {
      fill = "#A6B91A"
    }
    if (this.props.primaryType === "rock") {
      fill = "#B6A136"
    }
    if (this.props.primaryType === "ghost") {
      fill = "#735797"
    }
    if (this.props.primaryType === "dragon") {
      fill = "#6F35FC"
    }
    if (this.props.primaryType === "dark") {
      fill = "#705746"
    }
    if (this.props.primaryType === "steel") {
      fill = "#B7B7CE"
    }
    if (this.props.primaryType === "fairy") {
      fill = "#D685AD"
    }

    return(
      <ResponsiveContainer width="100%" height="95%">
        <BarChart
          width={500}
          height={500}
          data={this.state.chartData}
          margin={{
            top: 50, right: 30, left: 10, bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis tickSize={25} domain={[0, 200]}/>
          <Tooltip />
          <Bar dataKey="Rating" fill={fill} />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default PokeChart;
