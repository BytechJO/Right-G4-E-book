import ComprehensionA from "./page5_ComprehensionA";
import ComprehensionB from "./page5_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page5/SVG/Asset 30.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd3pg5-reading-adult-lady_sHccBvXt.mp3";
import ReadingSection from "../ReadingSection";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page5/SVG/Asset 31.svg";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.12,
    end: 5.16,
    text: "Page 5 reading. What would you like to see invented in the future?",
  },
  {
    start: 5.16,
    end: 8.06,
    text: "Do you have an idea for a future invention?",
  },
  {
    start: 8.06,
    end: 10.24,
    text: "Inventions of the Future.",
  },
  {
    start: 11.42,
    end: 14.18,
    text: "What kinds of things will be invented in the future?",
  },
  {
    start: 14.18,
    end: 18.52,
    text: "Many people like to talk about what will happen in the future.",
  },
  {
    start: 18.52,
    end: 21.04,
    text: "Will there be things that we won't use anymore?",
  },
  {
    start: 22.24,
    end: 25.08,
    text: "There are some people who like to think about the future.",
  },
  {
    start: 25.08,
    end: 26.90,
    text: "They are building a museum.",
  },
  {
    start: 26.90,
    end: 30.74,
    text: "It will be called The Museum of Future Inventions.",
  },
  {
    start: 32.12,
    end: 36.12,
    text: "This museum will show scientists' ideas about future technology.",
  },
  {
    start: 37.28,
    end: 41.00,
    text: "There will be tiny phones, and their screens will be projected.",
  },
  {
    start: 41.00,
    end: 44.70,
    text: "There will be new computers and games at this museum.",
  },
  {
    start: 44.70,
    end: 52.02,
    text: "Some of the items won't actually work because they haven't been invented yet, but they will be possibilities for the future.",
  },
  {
    start: 53.20,
    end: 56.62,
    text: "There will be a large room, like a library, for the future.",
  },
  {
    start: 56.62,
    end: 60.66,
    text: "Do you think there will be more books or more computers in that room?",
  },
  {
    start: 62.62,
    end: 66.68,
    text: "There will be ideas for a future cinema at this museum, too.",
  },
  {
    start: 66.68,
    end: 70.36,
    text: "There will even be an idea room for students.",
  },
  {
    start: 71.54,
    end: 75.20,
    text: "They will be able to give their ideas for future inventions.",
  },
  {
    start: 77.52,
    end: 81.64,
    text: "The museum will choose the best ideas and put them in the museum.",
  },
  {
    start: 81.64,
    end: 86.32,
    text: "Is there an idea that you would like to send to the Museum of Future Inventions?",
  },
];

  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
       mainTitle="What would you like to see invented in the future?  
Do you have an idea for a future invention?"
        title="Inventions of the Future"
        image={imgReading}
        image1= {img}
        question="Do you think new inventions will be good or bad for Earth?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8}
      />

 </div>
      <div className="w-[60%] mt-4 space-y-6 mb-7">
        {/* <ComprehensionA />
        <ComprehensionB /> */}
      </div>
     
    </div>
  );
};

export default ReadingSection_U1;