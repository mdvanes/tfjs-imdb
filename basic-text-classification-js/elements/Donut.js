import {LitElement, html} from '@polymer/lit-element';

/*
<svg class="chart1" width="420" height="150" aria-labelledby="title desc" role="img">
  <title id="title">A bar chart showing information</title>
<desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
<g class="bar">
  <rect width="40" height="19"></rect>
  <text x="45" y="9.5" dy=".35em">4 apples</text>
</g>
<g class="bar">
  <rect width="80" height="19" y="20"></rect>
  <text x="85" y="28" dy=".35em">8 bananas</text>
</g>
<g class="bar">
  <rect width="150" height="19" y="40"></rect>
  <text x="150" y="48" dy=".35em">15 kiwis</text>
</g>
<g class="bar">
  <rect width="160" height="19" y="60"></rect>
  <text x="161" y="68" dy=".35em">16 oranges</text>
</g>
<g class="bar">
  <rect width="230" height="19" y="80"></rect>
  <text x="235" y="88" dy=".35em">23 lemons</text>
</g>
</svg>
 */

// Based on https://css-tricks.com/how-to-make-charts-with-svg/
class Donut extends LitElement {

  static get properties() {
    return {
      radius: {type: Number},
      max: {type: Number}
    }
  }

  constructor() {
    super();
    this.radius = 50;
    this.offset = this.radius * 1.5; // 25 -> 50, 50 -> 75
    this.max = 2 * Math.PI * this.radius;
  }

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  _getSdaByPercentage(percentage) {
    return `${this.max * percentage}, ${this.max - (this.max * percentage)}`;
  }

  run() {
    const pie = document.querySelector('.pie');
    setTimeout(() => {
      // 158 316
      // 100% is 2*PI*r
      // 100% is 156 when r=25, 25% is 39, 75% is 117
      // 100% is 321 when r=50?
      const percentage = 25;
      pie.style.strokeDasharray = this._getSdaByPercentage(0.25);
    }, 1000);
    setTimeout(() => {
      // 100% is 156, 25% is 39, 75% is 117
      pie.style.strokeDasharray = this._getSdaByPercentage(0.75);
    }, 2000);
    setTimeout(() => {
      // 100% is 156, 25% is 39, 75% is 117
      pie.style.strokeDasharray = this.max;
      pie.style.stroke = 'mediumspringgreen';
    }, 3000);
  }

  render() {
    return html`
        <style>
            circle {
              fill: #f5f5f5;
              stroke: #d50000;
              stroke-width: 25%;
              stroke-dasharray: 0, ${this.max};
              transition: stroke-dasharray .3s ease, stroke 1s ease;
            }

            .chart {
              margin: 0 auto;
              transform: rotate(-90deg);
              background: #424242;
              border-radius: 50%;
              display: block;
            }
        </style>
        <svg width="150" height="150" class="chart">
            <circle r="${this.radius}" cx="${this.offset}" cy="${this.offset}" class="pie"/>
        </svg>`;
  }

}

customElements.define('t-donut', Donut);
