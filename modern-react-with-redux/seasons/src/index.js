import React from "react";
import ReactDOM from "react-dom";

// const App = () => {
//   navigator.geolocation.getCurrentPosition(
//     // 位置情報を表示するコールバック
//     (position) => {
//       console.log(position.coords.latitude);
//       console.log(position.coords.longitude);
//     },
//     // エラー情報を表示するコールバック
//     (err) => console.log(err)
//   );

//   return <div>Latitude: </div>;
// };

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { lat: null, errorMessage: '' };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  // React says we have to define render
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    };

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    };

    return <div>loading!</div>
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
