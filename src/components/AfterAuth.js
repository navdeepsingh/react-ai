import React, { Component } from 'react';

// Stateless Function Component
class AfterAuth extends Component {
  constructor(){
    super();
  }

  componentDidMount() {
    let param = this.props.location.search;
    let token = this._getParameterByName('token', param);
    let handle = this._getParameterByName('handle', param);
    localStorage.setItem(`${handle}Token`, token);
    window.close();
  }

  _getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  render() {
  return (
        <div>
            <h2>Authourizing..</h2>
        </div>
      )
    }
}

module.exports = AfterAuth;
