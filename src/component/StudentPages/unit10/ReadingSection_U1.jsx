import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 83/SVG/Asset 24 (1).svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd54pg83-reading-adult-lady_m7FZ8z2S.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 83/SVG/Asset 11.svg"

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];

const captions = [
  {
    start: 0.18,
    end: 1.94,
    text: "Page 83. Reading.",
  },
  {
    start: 1.94,
    end: 9.32,
    text: "When it's hot, what do you do to feel cooler? When it's cold, what do you do to feel warmer?",
  },
  {
    start: 9.32,
    end: 15.74,
    text: "Travel tips. Have you ever been to the Arctic? A rainforest? A desert?",
  },
  {
    start: 15.74,
    end: 21.18,
    text: "For places with unusual weather, you must dress a special way to protect yourself.",
  },
  {
    start: 22.28,
    end: 30.52,
    text: "Have you traveled to or lived in a very cold place? You must wear many layers of warm clothes in snowy, icy places.",
  },
  {
    start: 31.68,
    end: 35.88,
    text: "It's also a good idea to have matches and wood for a fire.",
  },
  {
    start: 37.12,
    end: 40.48,
    text: "Remember, your food and water can freeze, too.",
  },
  {
    start: 40.48,
    end: 48.42,
    text: "The opposite of a cold place is a desert. But surprisingly, some of the tips are the same for both places.",
  },
  {
    start: 48.42,
    end: 51.22,
    text: "Have you heard about cool desert nights?",
  },
  {
    start: 52.30,
    end: 55.44,
    text: "It's good to wear layers at night in the desert, too.",
  },
  {
    start: 55.44,
    end: 60.86,
    text: "It's also good to keep most of your skin covered in the day to protect it from the sun.",
  },
  {
    start: 61.98,
    end: 66.38,
    text: "Use light, loose material to cover your skin, as it won't make you hotter.",
  },
  {
    start: 66.38,
    end: 68.82,
    text: "Remember to take water with you.",
  },
  {
    start: 70.04,
    end: 73.90,
    text: "A rainforest can be as hot as a desert, but much wetter.",
  },
  {
    start: 75.04,
    end: 80.46,
    text: "Carry plenty of water with you in a rainforest because the damp air will make you sweat.",
  },
  {
    start: 81.52,
    end: 86.50,
    text: "Take plenty of bug spray and wear clothing that covers your arms and legs.",
  },
  {
    start: 86.50,
    end: 89.94,
    text: "Most of all, be ready to take plenty of pictures.",
  },
];
  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="
hen it’s hot, what do you do to feel cooler? When it’s 
cold, what do you do to feel warmer?"
        image1= {imgReading}
                image={img}
        
        question="Do you think new inventions will be good or bad for Earth?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={1.94}
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