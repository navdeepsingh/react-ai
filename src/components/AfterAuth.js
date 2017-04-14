import React, { Component } from 'react';

// Stateless Function Component
class AfterAuth extends Component {
  constructor(){
    super();
    window.close();
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
