import {LitElement, html} from '@polymer/lit-element';
import './ExampleReviewText';

class RealTimePredict extends LitElement {
  static get properties() {
    return {
      escapedValue: {type: String},
      predictor: {type: Object},
    };
  }

  constructor() {
    super();
    this.escapedValue = '';

    // TODO add escaping/sanitizing
    // TODO add multiple examples
    // TODO bind (with RxJS) to the textarea. Onchange, update the prediction.
    // TODO min & max length to respond to changes
    // TODO throttle onchange
  }

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  _handleChange(ev) {
    this.escapedValue = ev.target.value;
    if (this.predictor) {
      const resultObj = this.predictor.predict(this.escapedValue, 0, '', true);
      this.result = resultObj.predictionValue >= 0.5
        ? `👍 (${resultObj.predictionValue})`
        : `👎 (${resultObj.predictionValue})`;
    } else {
      alert('no predictor set');
    }
  }

  render() {
    return html`
      <div class="mdl-grid" style="max-width: 950px;">
        <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Type review:</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <textarea 
              style="border: 1px dotted black; width: 100%; height: 200px;" 
              @change="${(e) => this._handleChange(e)}"></textarea>
            escaped value:
            <div 
              style="border: 1px dashed blue; max-height: 100px; overflow-y: scroll;"
            >${this.escapedValue}</div>
            <br> 
            prediction:
            <br>
            <div>${this.result}</div>
          </div>
        </div>
        <example-review-text 
          class="mdl-cell mdl-cell--6-col"
        ></example-review-text>
      </div>
    `;
  }
}

customElements.define('real-time-predict', RealTimePredict);
