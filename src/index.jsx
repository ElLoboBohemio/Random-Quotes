import React from "react";
import reactDom from "react-dom";

import "./styles.css";

const API = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;

const colores = ["#A93978", "#5E388F", "#39528D", "#319168", "#319168", "#D34747"];

class App extends React.Component {
  state = {
    quotes: [
      {
        quote: "",
        author: "",
      },
    ],
    index: 0,
    color: "#39528D",
  };

  componentDidMount() {
    //LLamar API y la coloca como State
    fetch(API)
      .then((res) => res.json())
      .then((res) => this.setState({ quotes: res.quotes }, this.getQuoteIndexAndColor));
  }

  //Genera un numero random para llamar una Quote
  getQuoteIndexAndColor = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({ index });
    }

    const color = Math.floor(Math.random() * colores.length);
    this.setState({ color: colores[color] });
  };

  render() {
    const { quotes, index } = this.state;

    const quote = quotes[index]; //Selacciona una QUote Basado en el Index random

    const tweetQuote = `https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}`;

    return (
      <div className="container" style={{ backgroundColor: this.state.color }}>
        <div className="quote">
          {quote && (
            <div className="text">
              <svg
                className="text__svg"
                xmlns="http://www.w3.org/2000/svg"
                fill={this.state.color}
                viewBox="0 0 24 24"
              >
                <path d="M9.983 3v7.391C9.983 16.095 6.252 19.961 1 21l-.995-2.151C2.437 17.932 4 15.211 4 13H0V3h9.983zM24 3v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151C16.437 17.932 18 15.211 18 13h-3.983V3H24z" />
              </svg>
              <p className="text__p" style={{ color: this.state.color }}>
                {quote.quote}
              </p>
              <br />
              <cite className="text__cite" style={{ color: this.state.color }}>
                - {quote.author}
              </cite>
              <br />
            </div>
          )}

          <div className="btns">
            <a href={tweetQuote} target="_blank" rel="noreferrer">
              <button className="btns__btn" style={{ backgroundColor: this.state.color }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-twitter"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </button>
            </a>
            <button
              className="btns__btn"
              onClick={this.getQuoteIndexAndColor}
              style={{ backgroundColor: this.state.color }}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

reactDom.render(<App />, document.getElementById("quote-box"));
