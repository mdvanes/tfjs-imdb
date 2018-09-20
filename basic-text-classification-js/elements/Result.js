import {html, render} from 'lit-html';

// let myTemplate = (data) => html`
//   <h1>${data.title}</h1>
//   <p>${data.body}</p>`;
//
// const result = myTemplate({title: 'Hello', body: 'lit-html is cool'});
// render(result, document.body);

const data = {title: 'Hello', body: 'lit-html is cool'};

// See https://github.com/mdvanes/realtime-planner/blob/a611aaba2febfa0723092b09d139cc78a0ba3bd4/src/LatestTweet.ts
class Result extends HTMLElement {
  constructor() {
    super();
    // TODO why is polyfill in index.html needed? <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js"></script>
    this.render();
  }

  render() {
    const header = html`
      <h1>${data.title}</h1>
      <p>${data.body}</p>`;
    render(header, this);
  }
}

customElements.define('t-result', Result);
