import {LitElement, html, property} from '@polymer/lit-element';

class Result extends LitElement {

  static get properties() {
    return {
      mood: {type: String}
    };
  }

  constructor() {
    super();
    this.mood = 'happy';
  }

  render() {
    return html`<style> .mood { color: green; } </style>
          Web Components are <span class="mood">${this.mood}</span>!`;
  }

}

customElements.define('t-result', Result);


// import { LitElement, html } from 'lit-html-element';
//
// const data = {title: 'Hello', body: 'lit-html is cool'};
//
// // TODO why is polyfill in index.html needed? <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js"></script>
// // See https://github.com/mdvanes/realtime-planner/blob/a611aaba2febfa0723092b09d139cc78a0ba3bd4/src/LatestTweet.ts
//
// class Result extends LitElement {
//   render() {
//     return html`
//       <h1>${data.title}</h1>
//       <p>${data.body}</p>`;
//   }
// }
//
// customElements.define('t-result', Result);
