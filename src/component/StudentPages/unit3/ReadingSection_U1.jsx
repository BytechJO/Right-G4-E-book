import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd16pg23-reading-adult-lady_Feoi9jgI.mp3";
import ReadingSection from "../ReadingSection";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 23/SVG/Asset 2.svg";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.52,
    end: 2.14,
    text: "Page 23, Reading.",
  },
  {
    start: 3.82,
    end: 16.84,
    text: "Do you have your own room? What does your room look like? Has your room changed? Has your room ever changed? Is it the same as when you were a baby? Is it different? It probably has changed.",
  },
  {
    start: 16.84,
    end: 24.00,
    text: "When you were small, you had a crib. Your toys were probably different too. You probably have different ones now.",
  },
  {
    start: 25.02,
    end: 34.76,
    text: "Did you have soft toys when you were a baby? Maybe you had a rattle or a mobile. These kinds of toys are fun for babies. What kinds of things do you play with now?",
  },
  {
    start: 35.86,
    end: 42.32,
    text: "Now, you can choose your toys, but when you were little, your parents got your toys. They were probably safe for you.",
  },
  {
    start: 43.64,
    end: 52.66,
    text: "Did you have different colors in your room when you were a baby? Are any of those colors in your room now? Do you share a room or do you have your own room?",
  },
  {
    start: 53.96,
    end: 67.20,
    text: "There are probably many ways your room has changed. Ask your parents or look at old pictures of your room. Find out what you had in your room when you were a baby. Do you remember any of the things?",
  },
];
  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="What would you like to see invented in the future? Do you have an idea for a future invention?"
        title="Inventions of the Future"
        image={imgReading}
        image1= {img}
        question="Do you think new inventions will be good or bad for Earth?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={2.5}
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