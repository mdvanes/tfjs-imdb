import {LitElement, html} from '@polymer/lit-element';

/*
<svg class="chart1" width="420" height="150"
aria-labelledby="title desc" role="img">
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
      perc: {type: Number},
      target: {type: String},
      isPositive: {type: Boolean},
      radius: {type: Number},
      max: {type: Number},
    };
  }

  constructor() {
    super();
    this.radius = 50;
    this.offset = 67.5; // TODO 0,5*width of .chart
    this.max = 2 * Math.PI * this.radius;

    this.pie = {
      radius: this.radius / 2,
      max: this.max / 2,
    };
  }

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  _getSdaByPercentage(percentage) {
    return `${this.max * percentage}, ${this.max - (this.max * percentage)}`;
  }

  run(percentage = 0.5, isPositive = true) {
    const donut = this.querySelector('.donut');
    const pie = this.querySelector('.pie');
    pie.style.strokeDashoffset = isPositive
      ? this.pie.max / 2
      : pie.style.strokeDashoffset;
    const isOnTarget = (percentage >= 0.5 && isPositive)
      || (percentage < 0.5 && !isPositive);
    pie.style.stroke = isOnTarget ? '#33fa9a' : '#d50000';
    donut.style.strokeDasharray = this._getSdaByPercentage(percentage);
    donut.style.stroke = '#2196f3';
  }

  render() {
    const perc = this.getAttribute('perc');
    const target = this.getAttribute('target');
    /* TODO without timeout. getAttribute('perc') becomes available in
    render(), but the pie elem is not yet added to DOM */
    setTimeout(() => {
      this.run(perc, target === 'positive');
    }, 1);
    return html`
       <style>
           .chart {
             margin: 0 auto;
             transform: rotate(-90deg);
             background: #424242;
             border-radius: 50%;
             display: block;
           }
           
           .donut {
             fill: #f5f5f5;
             stroke: #2196f3;
             stroke-width: 25%;
             stroke-dasharray: 0, ${this.max};
             transition: stroke-dasharray .3s ease, stroke 1s ease;
           }

           .donut-hole {
             fill: #f5f5f5;
           }
           
           .pie {
             fill: #f5f5f5;
             stroke-width: 50;
             stroke-dasharray: 
              ${this.pie.max / 2}, ${this.pie.max / 2};
           }
       </style>
       <svg width="135" height="135" class="chart">
           <circle r="${this.radius}" cx="${this.offset}" cy="${this.offset}"
              class="donut"/>
           <circle r="${this.radius}" cx="${this.offset}" cy="${this.offset}"
              class="donut-hole"/>
           <circle r="${this.radius / 2}" cx="${this.offset}" 
              cy="${this.offset}"
              class="pie"/>
       </svg>`;
  }
}

customElements.define('t-donut', Donut);
