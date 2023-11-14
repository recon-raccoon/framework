const {linguisticProfile} = require('../lib/linguisticProfile');


const ElonMusk = new linguisticProfile();
const ElonParody = new linguisticProfile();

// Taken from elons X (Twitter) account
ElonMusk.train("Was just informed that approval to launch should happen in time for a Friday launch");
ElonMusk.train("Cool")
ElonMusk.train("Groooook")
ElonMusk.train("Liftoff!")
ElonMusk.train("Great episode, just watched it 😂😂")
ElonMusk.train("“Public Relations” is a propaganda word for propaganda")
ElonMusk.train("Amplify Empathy")
ElonMusk.train("Would you like some tea?")
ElonMusk.train("Falcon has delivered over 1000 tons to orbit this year, a world record")
ElonMusk.train("That’s the goal")
ElonMusk.train("Diablo IV is a good game. Underrated by some.")
ElonMusk.train("And yet they are pursuing me for a non-existent “glass house” and for hiring US citizens. Sounds fair.")
ElonMusk.train("Hmm")
ElonMusk.train("Does seem crazy that the zombie apocalypse can be cleaned up for an important visitor, but not for those who live there and pay for everything!")
ElonMusk.train("It was an honor to have you visit Tesla! My apologies for not being able to travel to California today, but I look forward to meeting at a future date.")
ElonMusk.train("The Constitution still applies in New York, no matter what any governor may say")
ElonMusk.train("Accurate 🤣🤣")
ElonMusk.train("Good question")
ElonMusk.train("Cool that you’re doing live debates on this platform!")
ElonMusk.train("This is definitely real?")


ElonParody.train("I spent $44 billion for this app and now Lizard boy just decided to hit copy and paste. It’s personal now. See you in the cage, Zuck.")
ElonParody.train("I ❤️ Texas.")
ElonParody.train("Can you guess who this is?")
ElonParody.train("Imagine Elon Musk, me, gives you a free Tesla. Where would you drive first?")
ElonParody.train("If you walk around downtown San Francisco right near the 𝕏/Twitter headquarters, it’s a zombie apocalypse…")
ElonParody.train("What would you ask Grok?")
ElonParody.train("What is more important than having more children and being a good father? We know that earth can sustain way more people and the more people we have the more innovation, technology, and other advancements occur. We should also remember the importance of being a good father. A cornerstone of society.")
ElonParody.train("Why did they decide to clean San Francisco now? Why wasn’t this done earlier? It takes foreign leaders visiting the city for them to do anything regarding the homelessness problem. In front of the 𝕏 headquarters used to be zombie land. It’s sad that it took this long to get here. I’m moving to Mars…")
ElonParody.train("Elon the spaceman Musk")
ElonParody.train("What’s his name though?")
ElonParody.train("Why there? Why not somewhere like California?")
ElonParody.train("Yeah, now would be a good time to go to San Francisco and see it fresh!")
ElonParody.train("Yeah it’s terrible. Yet they don’t do anything unless a foreign leader comes to town!")
ElonParody.train("My friend Tesla made the Big Bang happen")
ElonParody.train("Not even aliens could solve this")
//ElonParody.train("aaaaaaaaa")
//ElonParody.train("aaaaaaaaa")
//ElonParody.train("aaaaaaaaa")
//ElonParody.train("aaaaaaaaa")
//ElonParody.train("aaaaaaaaa")

console.log(ElonMusk.getProfile())

/*

// Retrieving and printing word frequency distributions
console.log('Word Frequency Distribution for Real Elon:', ElonMusk.getWordFrequencyDistribution());
console.log('Word Frequency Distribution for Parody Elon:', ElonParody.getWordFrequencyDistribution());

// Calculating and printing Jaccard similarity
const similarity = ElonMusk.calculateJaccardSimilarity(ElonParody);
console.log('Jaccard Similarity between Person One and Person Two:', similarity);

*/