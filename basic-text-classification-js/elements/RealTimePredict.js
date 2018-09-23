import {LitElement, html, property} from '@polymer/lit-element';
import './ExampleReviewText';

class RealTimePredict extends LitElement {

  // static get properties() {
  //   return {
  //     title: {type: String},
  //     body: {type: String},
  //     results: {type: Array}
  //   };
  // }
  //
  // constructor() {
  //   super();
  //   this.title = data.title;
  //   this.body = data.body;
  //   this.results = [];
  // }

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="mdl-grid" style="max-width: 950px;">
        <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Type review:</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <textarea style="border: 1px dotted black"></textarea>
            <br>
            escaped value:
            <br> 
            prediction: 
          </div>
        </div>
        <example-review-text class="mdl-cell mdl-cell--6-col"></example-review-text>
      </div>
    `;
  }

}

customElements.define('real-time-predict', RealTimePredict);
