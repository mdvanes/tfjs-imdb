import {LitElement, html, property} from '@polymer/lit-element';
import './ExampleReviewText';

class RealTimePredict extends LitElement {

  static get properties() {
    return {
      escapedValue: {type: String},
    };
  }

  constructor() {
    super();
    this.escapedValue = 'abc';

    // TODO bind (with RxJS) to the textarea. Onchange, update the prediction.
    // TODO min & max length to respond to changes
    // TODO throttle onchange
    // TODO add escaping/sanitizing
  }

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
            <textarea style="border: 1px dotted black; width: 100%; height: 200px;"></textarea>
            <br>
            escaped value:
            <div style="border: 1px dashed blue;">${this.escapedValue}</div>
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
