import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 77/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd48pg77-reading-adult-lady_oaCVYLur.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 77/SVG/Asset 23.svg"

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.28,
    end: 2.10,
    text: "Page 77, Reading.",
  },
  {
    start: 2.10,
    end: 10.08,
    text: "What are the things that your parents do to take care of you? Do you think that animals have parents that take care of them, too?",
  },
  {
    start: 10.08,
    end: 12.10,
    text: "A different kind of king.",
  },
  {
    start: 12.10,
    end: 22.24,
    text: "Emperor means king, and the emperor penguins got their name from their large size and the amazing things they do in their lives.",
  },
  {
    start: 22.24,
    end: 28.56,
    text: "Every year, emperor penguins walk for more than one hundred kilometers across the ice.",
  },
  {
    start: 28.56,
    end: 31.98,
    text: "They travel in groups of hundreds of penguins.",
  },
  {
    start: 31.98,
    end: 37.22,
    text: "They walk until they find a good place for the female penguins to lay their eggs.",
  },
  {
    start: 38.62,
    end: 40.78,
    text: "Each female penguin lays one egg.",
  },
  {
    start: 40.78,
    end: 48.46,
    text: "Surprisingly, the father sits on the egg because the mother must walk back to the sea to look for food for the baby.",
  },
  {
    start: 50.20,
    end: 53.04,
    text: "The father waits patiently for the eggs to hatch.",
  },
  {
    start: 53.04,
    end: 60.60,
    text: "They wait sixty-four days. They have to stand close together because it is freezing and windy.",
  },
  {
    start: 62.42,
    end: 65.12,
    text: "The eggs hatch while the mothers are gone.",
  },
  {
    start: 65.12,
    end: 70.68,
    text: "When they come back with food for their babies, the fathers go to find food to eat.",
  },
  {
    start: 70.68,
    end: 72.36,
    text: "They are probably very hungry.",
  },
  {
    start: 72.36,
    end: 78.12,
    text: "The parents find food for their babies until the baby penguins are about four months old.",
  },
  {
    start: 79.60,
    end: 84.34,
    text: "After that, the babies must find their own food and take care of themselves.",
  },
  {
    start: 84.34,
    end: 88.02,
    text: "Emperor penguins are amazing animals.",
  },
];
  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="What are the things that your parents do to take care 
of you? Do you think that animals have parents that 
take care of them, too?"
        image={imgReading}
        image1= {img}
        sound={readingAudio}
        captions={captions}
        stopAtSecond={2.5}
          textLen = {31}
      />

 </div>
      <div className="w-[60%] mt-4 space-y-6 mb-7">
        {/* <ComprehensionA /> */}
        {/* <ComprehensionB /> */}
      </div>
     
    </div>
  );
};

export default ReadingSection_U1;