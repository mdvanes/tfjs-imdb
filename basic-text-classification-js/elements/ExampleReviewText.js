import {LitElement, html, property} from '@polymer/lit-element';

class ExampleReviewText extends LitElement {

  // Do not create shadow root
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
      h3 {
        font-size: 1.3em;
        font-weight: bold;
        margin: 0.3em 0;
      }
      </style>
      <div class="mdl-card mdl-shadow--2dp" style="width: 100%">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Example reviews</h2>
        </div>
        <div class="mdl-card__supporting-text">
            <p>
              <a href="https://www.imdb.com/title/tt0065086/reviews?ref_=tt_urv">Reviews for "That Cold Day in the Park (1969)"</a>
            </p>
            <h3><a href="https://www.imdb.com/review/rw0109322/">Positive review</a></h3>
            <div>'That Cold Day In The Park' is an extremely underrated psycho-thriller directed by a pre-fame Robert Altman. Sandy Dennis (who Altman would eventually reunite with on 'Come Back To The Five And Dime, Jimmy Dean, Jimmy Dean' in the early 80s) plays Frances Austen, a repressed thirty-something woman who is trapped in a boring bourgeois life after the death of her mother. 
She becomes fascinated by the sight of a young man (Michael Burns) who sits in the park getting soaked in the rain. After her guests leave she invites him into her home to get warmed up, and after discovering that he is mute an odd relationship develops between them. 
We soon find out that he he has the power of speech, but she is none the wiser, and his silence allows her to open up a little. After that things get well, complicated. I don't want to spoil what follows but it's fascinating to watch the events unfold, and Dennis' performance is terrific. Sadly she passed away in the early 1990s, Sean Penn's terrific 'The Indian Runner' being her last movie. 
I know nothing about Michael Burns, but he is also very good, and the supporting cast includes small but important roles from Altman regular Michael Murphy and cult actress Luana Anders ('Dementia 13', 'Easy Rider', 'Greaser's Palace'). 'That Cold Day In The Park' has been neglected for far too long. It's an excellent movie which I highly recommend.</div>
            <h3><a href="https://www.imdb.com/review/rw2328478/">Negative review</a></h3>
            <div>I was really expecting more from this.

It's incredibly and annoyingly slow, as opposed to interesting and sensitively so.

It's very dumb. A woman invites a boy she sees sitting in the rain, in a park, into her home and for days he pretends to be mute and she accepts it and him, without even trying to make any other form of communication. 

There's zero humor. I know it's meant to be a thriller, but the odd light moment would really have helped. The performances are wooden. The direction clumsy.

In many ways this is more like a play (a bad play). Very little location. Very little movement. So don't expect to see much of Vancouver circa 1968.

No one says anything even vaguely interesting and the final 'twist' if that's what you call it, is so predictable that it's almost a surprise.

I did like the sweet Johnny Mandel theme that played during the early scenes, very much. Otherwise I can think of nothing else to recommend it.</div>
        </div>
      </div>
    `;
  }

}

customElements.define('example-review-text', ExampleReviewText);
