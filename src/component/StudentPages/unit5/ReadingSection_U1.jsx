import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 41/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd28pg41-reading-adult-lady_j9OdSKOC.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 41/SVG/Asset 2.svg"

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.34,
    end: 8.28,
    text: "Page 42, Reading. Would you like to live in space? Would living in space be different from living on Earth?",
  },
  {
    start: 8.28,
    end: 10.60,
    text: "This station isn't for TV.",
  },
  {
    start: 12.18,
    end: 14.44,
    text: "Did you know that some people live in space?",
  },
  {
    start: 14.44,
    end: 22.66,
    text: "Scientists want to study people living in space, so they ask astronauts to stay at space stations for a year or longer.",
  },
  {
    start: 22.66,
    end: 27.10,
    text: "The astronauts study about space and about the planets.",
  },
  {
    start: 27.10,
    end: 33.90,
    text: "They must learn how to eat without a plate and sleep without a bed because everything floats in space.",
  },
  {
    start: 33.90,
    end: 41.40,
    text: "Sometimes they can go for a walk outside the space station, but they are actually going for a float.",
  },
  {
    start: 41.40,
    end: 44.82,
    text: "They must wear special suits and carry their own air.",
  },
  {
    start: 44.82,
    end: 48.44,
    text: "Life in space is very different from life on Earth.",
  },
  {
    start: 48.44,
    end: 55.50,
    text: "There is an International Space Station that has had people in it for many years.",
  },
  {
    start: 55.50,
    end: 62.50,
    text: "Astronauts from the USA, Russia, Europe, and Japan have lived on this space station.",
  },
  {
    start: 64.44,
    end: 71.76,
    text: "It is about the same size as an American football field, and it has had over two hundred people visit it.",
  },
  {
    start: 71.76,
    end: 75.80,
    text: "There is even a travel agency that offers trips to a space station.",
  },
];
  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="Would you like to live in space? Would living in space 
be different from living on Earth? "
        title="Inventions of the Future"
        image={imgReading}
        image1= {img}
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.28}
      />

 </div>
      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />
        <ComprehensionB />
      </div>
     
    </div>
  );
};

export default ReadingSection_U1;