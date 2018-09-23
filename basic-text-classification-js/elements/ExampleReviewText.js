import {LitElement, html, property} from '@polymer/lit-element';

class ExampleReviewText extends LitElement {

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="mdl-card mdl-shadow--2dp" style="width: 100%">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Example review</h2>
        </div>
        <div class="mdl-card__supporting-text">
          a lot of patience because it focuses on mood and character development the plot is very simple and many of the scenes take place on the same set in frances <UNK> the sandy dennis character apartment but the film builds to a disturbing climax br br the characters create an atmosphere <UNK> with sexual tension and psychological <UNK> it's very interesting that robert altman directed this considering the style and structure of his other films still the trademark altman audio style is evident here and there i think what really makes this film work is the brilliant performance by sandy dennis it's definitely one of her darker characters but she plays it so perfectly and convincingly that it's scary michael burns does a good job as the mute young man regular altman player michael murphy has a small part the <UNK> moody set fits the content of the story very well in short this movie is a powerful study of loneliness sexual <UNK> and desperation be patient <UNK> up the atmosphere and pay attention to the wonderfully written script br br i praise robert altman this is one of his many films that deals with unconventional fascinating subject matter this film is disturbing but it's sincere and it's sure to <UNK> a strong emotional response from the viewer if you want to see an unusual film some might even say bizarre this is worth the time br br unfortunately it's very difficult to find in video stores you may have to buy it off the internet
        </div>
      </div>
    `;
  }

}

customElements.define('example-review-text', ExampleReviewText);
