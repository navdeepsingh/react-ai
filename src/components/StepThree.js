import React from 'react';
import { Panel } from 'react-bootstrap';

// Stateless Function Component
const stepTwo = (props) => {

  return (
        <Panel className="stepThree" header="Step Three : Analyzing Sentences">
          <p>By using 3rd party API, semantic analysis of feeds will be done.</p>
          {
            !props.analyzed
            ? <button className="btn btn-lg btn-primary" onClick={props.onClickAnalyze}>Initiate Analyzing</button>
            : <a href="" onClick={props.onClickResults} className="btn btn-lg btn-success pull-right" onClick={props.onClickResults}>Results</a>
          }


        </Panel>
      )
}

module.exports = stepTwo;
