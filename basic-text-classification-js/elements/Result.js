import {LitElement, html, property} from '@polymer/lit-element';

const data = {title: 'Results', body: 'Running...'};

// See https://github.com/mdvanes/realtime-planner/blob/a611aaba2febfa0723092b09d139cc78a0ba3bd4/src/LatestTweet.ts
class Result extends LitElement {

  static get properties() {
    return {
      title: {type: String},
      body: {type: String},
      results: {type: Array}
    };
  }

  constructor() {
    super();
    this.title = data.title;
    this.body = data.body;
    this.results = [];
  }

  addResult(result) {
    console.log('Adding result:', result);
    this.results.push(result);
  }

  render() {
    const list = this.results && this.results.length > 0
      ? html`
        <ul>
            ${this.results.map(result => html`<li>${result}</li>`)}
        </ul>
      `
      : 'Loading result list...';

    return html`
        <style> 
            .custom-header { color: green; }
        </style>
        <h1 class="custom-header">${this.title}</h1>
        <p>${this.body}</p>
        ${list}
    `;
  }

}

customElements.define('t-result', Result);
