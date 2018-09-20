import {LitElement, html, property} from '@polymer/lit-element';

const data = {title: 'Hello', body: 'General Kenobi'};

// See https://github.com/mdvanes/realtime-planner/blob/a611aaba2febfa0723092b09d139cc78a0ba3bd4/src/LatestTweet.ts
class Result extends LitElement {

  static get properties() {
    return {
      title: {type: String},
      body: {type: String}
    };
  }

  constructor() {
    super();
    this.title = data.title;
    this.body = data.body;
  }

  render() {
    return html`
        <style> .mood { color: green; } </style>
            <h1><span class="mood">${this.title}</span> there</h1>
            <p>${this.body}</p>`;
  }

}

customElements.define('t-result', Result);
