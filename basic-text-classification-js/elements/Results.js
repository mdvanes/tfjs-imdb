import {LitElement, html, property} from '@polymer/lit-element';

const data = {title: 'Results', body: html`<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>`};

// See https://github.com/mdvanes/realtime-planner/blob/a611aaba2febfa0723092b09d139cc78a0ba3bd4/src/LatestTweet.ts
class Results extends LitElement {

  static get properties() {
    return {
      title: {type: String},
      body: {type: String},
      results: {type: Array},
    };
  }

  constructor() {
    super();
    this.title = data.title;
    this.body = data.body;
    this.results = [];
  }

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  addResult(result) {
    console.log('Adding result:', result);
    this.results.push(result);
  }

  _renderResultChart({predictionValue, descriptionLabel, expectedResult}) {
    // TODO return either "is-positive" or nothing
    // const targetAttr = expectedResult >= 0.5 ? html`positive` : html`negative`;
    const targetAttr = expectedResult >= 0.5 ? 'positive' : 'negative';
    return html`<t-donut 
      perc="${predictionValue}" target="${targetAttr}"
      ></t-donut>
      <br/>
      ${descriptionLabel}<br/>
      ${expectedResult} / ${predictionValue} `;
  }

  render() {
    // const list = this.results && this.results.length > 0
    //   ? html`
    //     <ul>
    //         ${this.results.map(({predictionValue, descriptionLabel, expectedResultLabel}) => html`<li>${predictionValue}</li>`)}
    //     </ul>
    //   `
    //   : html`<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>`;
    const list = this.results && this.results.length > 0
      ? html`${this.results.map((result) => this._renderResultChart(result))}`
      : html`<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>`;

    return html`
        <style> 
            .custom-header { color: green; }
        </style>
        <div class="mdl-card mdl-shadow--2dp" style="width: 100%;">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text custom-header">${this.title}</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <p>${this.body}</p>
            ${list}
          </div>
        </div>
    `;
  }

}

customElements.define('t-results', Results);
