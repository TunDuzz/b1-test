// Dữ liệu bài tập Cloze Text
export const clozeTexts = [
  {
    id: 8,
    title: "The driest place on Earth",
    content: `The Atacama Desert in Chile is known as the driest place on Earth. It is almost 1,000 kilometers {1} lying between the Pacific Ocean and the Andes mountains. Under a centimeter of rain {2} annually, and the center is so dry {3} scientists have never recorded {4} rain there.

Over a million people {5} in the Atacama today. Most live on the coast, which is also home to teams of astronomers who are there to {6} advantage of the clear skies. In the north, farmers grow tomatoes with water they have collected from underground rocks. However, for {7} who have their farms on higher ground, the water comes from melting snow.

People generally seem to {8} knowledge about what the desert has to offer, but in {9}, there is plenty to do — from seeing the amazing natural sights to playing golf, one of the more recent activities {10} tourists to the region.`,
    questions: [
      { id: 1, options: ["by", "at", "to", "in"], correct: 3 },
      { id: 2, options: ["pours", "falls", "sinks", "lowers"], correct: 1 },
      { id: 3, options: ["as", "that", "when", "than"], correct: 1 },
      { id: 4, options: ["any", "no", "some", "little"], correct: 0 },
      { id: 5, options: ["totally", "exactly", "actually", "finally"], correct: 2 },
      { id: 6, options: ["have", "make", "get", "take"], correct: 3 },
      { id: 7, options: ["those", "these", "them", "they"], correct: 0 },
      { id: 8, options: ["fail", "lose", "miss", "lack"], correct: 3 },
      { id: 9, options: ["case", "turn", "fact", "time"], correct: 2 },
      { id: 10, options: ["arriving", "attracting", "approaching", "arranging"], correct: 1 }
    ]
  },
  {
    id: 15,
    title: "William the hero!",
    content: `Brave William Baldock, who is six years old, is a hero after helping his mother when she fell downstairs. William quickly rang {1} an ambulance when he discovered his mother had broken her leg. In spite of being frightened, he {2} the emergency services what had happened and answered all the questions they asked him. He also telephoned his father {3} work, and then his grandmother, to explain what he had {4}. While waiting for {5} people to come, William looked after his 18-month-old sister.

When ambulance man Steve Lyn went to the house, he was amazed: "It's {6} that a young boy of six knew the right number to {7}, and was able to give us the correct information. {8} of William's quick thinking, we were able to {9} there immediately."

Mrs Baldock left hospital yesterday, very {10} to both William and the ambulance service.`,
    questions: [
      { id: 1, options: ["to", "off", "for", "with"], correct: 2 },
      { id: 2, options: ["said", "talked", "spoke", "told"], correct: 3 },
      { id: 3, options: ["in", "at", "on", "by"], correct: 1 },
      { id: 4, options: ["done", "made", "acted", "worked"], correct: 0 },
      { id: 5, options: ["these", "every", "each", "this"], correct: 0 },
      { id: 6, options: ["pleased", "fine", "clever", "great"], correct: 3 },
      { id: 7, options: ["put", "set", "dial", "hit"], correct: 2 },
      { id: 8, options: ["Since", "Because", "As", "Although"], correct: 1 },
      { id: 9, options: ["manage", "find", "get", "reach"], correct: 2 },
      { id: 10, options: ["agreeable", "happy", "grateful", "approving"], correct: 2 }
    ]
  },
  {
    id: 16,
    title: "The History of Film",
    content: `The world's first film was shown in 1895 by two French brothers, Louis and Auguste Lumière. Although it only {1} of short, simple scenes, people loved it and films have {2} popular ever since. The first films were silent, with titles on the screen to {3} the story.

Soon the public had {4} favourite actors and actresses and, in this {5} the first film stars appeared. In 1927, the first 'talkie', a film with sound, was shown and from then on, the public {6} only accept this kind of film.

Further improvements continued, particularly in America, {7} produced 95% of all films. With the arrival of television in the 1950s, {8} people went to see films, but in {9} years cinema audiences have grown again. More countries have started to produce films that influence film-making and there are currently {10} national film industries.`,
    questions: [
      { id: 1, options: ["consisted", "contained", "belonged", "held"], correct: 0 },
      { id: 2, options: ["gone", "been", "made", "kept"], correct: 1 },
      { id: 3, options: ["join", "read", "explain", "perform"], correct: 2 },
      { id: 4, options: ["your", "his", "our", "their"], correct: 3 },
      { id: 5, options: ["reason", "way", "method", "result"], correct: 1 },
      { id: 6, options: ["should", "would", "might", "will"], correct: 1 },
      { id: 7, options: ["who", "where", "when", "which"], correct: 3 },
      { id: 8, options: ["other", "each", "fewer", "any"], correct: 2 },
      { id: 9, options: ["recent", "now", "modern", "present"], correct: 0 },
      { id: 10, options: ["many", "lots", "much", "plenty"], correct: 0 }
    ]
  },
  {
    id: 17,
    title: "The History of Shoes",
    content: `In the past, importance was not given to shoes being comfortable or fashionable. These early foot coverings were probably animal skins, {1} people tied round their ankles during cold {2}. We still use leather today, but {3} materials such as silk, plastic, or cotton are also popular, {4} on what is in fashion. It was only one hundred and fifty years {5} that people began to wear a different shoe on each foot. Formerly, the two shoes had been straight instead of shaped and {6} worn on the left or the right foot. All shoes used to be made by hand, but now, {7} there are shoemakers still using their {8} skills, most shoes are now machine-made in large factories. The introduction of sewing machines {9} the shoe industry to produce large {10} of cheaper shoes for a wider range of buyers.`,
    questions: [
      { id: 1, options: ["who", "why", "which", "where"], correct: 2 },
      { id: 2, options: ["weather", "climate", "temperature", "condition"], correct: 0 },
      { id: 3, options: ["either", "both", "another", "other"], correct: 3 },
      { id: 4, options: ["turning", "depending", "resting", "taking"], correct: 1 },
      { id: 5, options: ["before", "beyond", "ago", "after"], correct: 2 },
      { id: 6, options: ["must", "could", "ought", "might"], correct: 1 },
      { id: 7, options: ["although", "if", "unless", "since"], correct: 0 },
      { id: 8, options: ["typical", "usual", "model", "traditional"], correct: 3 },
      { id: 9, options: ["let", "allowed", "gave", "got"], correct: 1 },
      { id: 10, options: ["quantities", "totals", "sums", "sizes"], correct: 0 }
    ]
  }
];
