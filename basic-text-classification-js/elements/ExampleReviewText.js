import {LitElement, html, property} from '@polymer/lit-element';

class ExampleReviewText extends LitElement {

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  /*
  Source:
  Review for "That Cold Day in the Park (1969)"
  https://www.imdb.com/title/tt0065086/reviews?ref_=tt_urv

  Original text:

  This film requires a lot of patience. Because it focuses on mood and character development, the plot is very simple and many of the scenes take place on the same set - in Frances Austen's (the Sandy Dennis character) apartment. But the film builds to a disturbing climax.

The characters create an atmosphere rife with sexual tension and psychological trickery. It's very interesting that Robert Altman directed this, considering the style and structure of his other films. Still, the trademark Altman audio style is evident here and there. I think what really makes this film work is the brilliant performance by Sandy Dennis. It's definitely one of her darker characters, but she plays it so perfectly and convincingly that it's scary. Michael Burns does a good job as the "mute" young man. Regular Altman player Michael Murphy has a small part. The solemn, moody set fits the content of the story very well. In short, this movie is a powerful study of loneliness, sexual repression, and desperation. Be patient, soak up the atmosphere, and pay attention to the wonderfully written script.

I praise Robert Altman. This is one of his many films that deals with unconventional, fascinating subject matter. This film is disturbing, but it's sincere and it's sure to elicit a strong emotional response from the viewer. If you want to see an unusual film - some might even say bizarre - this is worth the time.

Unfortunately, it's very difficult to find in video stores. You may have to buy it off the internet.
   */

  render() {
    return html`
      <div class="mdl-card mdl-shadow--2dp" style="width: 100%">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Example review</h2>
        </div>
        <div class="mdl-card__supporting-text">
            <p>
              <a href="https://www.imdb.com/title/tt0065086/reviews?ref_=tt_urv">Review for "That Cold Day in the Park (1969)"</a>
            </p>
            <div>a lot of patience because it focuses on mood and character development the plot is very simple and many of the scenes take place on the same set in frances <UNK> the sandy dennis character apartment but the film builds to a disturbing climax br br the characters create an atmosphere <UNK> with sexual tension and psychological <UNK> it's very interesting that robert altman directed this considering the style and structure of his other films still the trademark altman audio style is evident here and there i think what really makes this film work is the brilliant performance by sandy dennis it's definitely one of her darker characters but she plays it so perfectly and convincingly that it's scary michael burns does a good job as the mute young man regular altman player michael murphy has a small part the <UNK> moody set fits the content of the story very well in short this movie is a powerful study of loneliness sexual <UNK> and desperation be patient <UNK> up the atmosphere and pay attention to the wonderfully written script br br i praise robert altman this is one of his many films that deals with unconventional fascinating subject matter this film is disturbing but it's sincere and it's sure to <UNK> a strong emotional response from the viewer if you want to see an unusual film some might even say bizarre this is worth the time br br unfortunately it's very difficult to find in video stores you may have to buy it off the internet</div>
        </div>
      </div>
    `;
  }

}

customElements.define('example-review-text', ExampleReviewText);
