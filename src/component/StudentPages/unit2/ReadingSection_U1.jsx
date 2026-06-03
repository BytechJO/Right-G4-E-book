import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 11/SVG/Asset 2.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd8pg11-reading-adult-lady_GCwsEHZl.mp3";
import ReadingSection from "../ReadingSection";

import img from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 11/SVG/Asset 3.svg";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];
const captions = [
  {
    start: 0.78,
    end: 3.28,
    text: "Page 11, Reading.",
  },
  {
    start: 3.28,
    end: 5.66,
    text: "What kind of sports do you like?",
  },
  {
    start: 5.66,
    end: 8.70,
    text: "What kinds of sports do you play during gym class?",
  },
  {
    start: 9.82,
    end: 10.72,
    text: "Sports Day.",
  },
  {
    start: 10.72,
    end: 14.72,
    text: "My class is planning an exciting event.",
  },
  {
    start: 14.72,
    end: 16.74,
    text: "We're going to play sports all day.",
  },
  {
    start: 16.74,
    end: 20.30,
    text: "We are trying to raise money for a charity in our town.",
  },
  {
    start: 21.32,
    end: 23.68,
    text: "This charity helps people find jobs.",
  },
  {
    start: 23.68,
    end: 27.20,
    text: "Our special sports day is going to be next Saturday.",
  },
  {
    start: 27.20,
    end: 33.34,
    text: "All the students in our class are asking their family and friends to sponsor them for the sports day.",
  },
  {
    start: 33.34,
    end: 44.96,
    text: "This means the sponsors are going to give us some money for each hour that we play. After we finish the day, we will take our card that shows how many hours we played to our sponsors.",
  },
  {
    start: 44.96,
    end: 51.04,
    text: "They will give us the money, and we are going to give all the money we get to the charity.",
  },
  {
    start: 51.04,
    end: 54.62,
    text: "Sports day is going to be 12 hours long.",
  },
  {
    start: 54.62,
    end: 58.48,
    text: "We are going to play soccer, basketball, and volleyball.",
  },
  {
    start: 58.48,
    end: 65.16,
    text: "We are going to play for two hours, and then we will take a break for half an hour.",
  },
  {
    start: 65.16,
    end: 69.16,
    text: "After each meal, we will sit and rest for a half an hour.",
  },
  {
    start: 69.16,
    end: 73.54,
    text: "That means we are going to play sports for a total of eight hours that day.",
  },
  {
    start: 74.58,
    end: 79.08,
    text: "I think we're going to be tired at the end of the day, but it's going to be fun.",
  },
];
  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="What kinds of sports do you like? What kinds of sports 
do you play during gym class?"
        image={imgReading}
        image1= {img}
        sound={readingAudio}
        captions={captions}
        stopAtSecond={9}
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