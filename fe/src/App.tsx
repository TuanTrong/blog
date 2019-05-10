import React from "react";
import "./App.css";

interface IAppProps {}

interface IAppState {
  apiResponse: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      apiResponse: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  render() {
    return <h1>{this.state.apiResponse}</h1>;
  }
}

export default App;
