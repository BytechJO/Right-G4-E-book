import ComprehensionA from "./ComprehensionA";
import ComprehensionB from "./ComprehensionB";

import imgReading from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 28/SVG/Asset 4.svg";
import readingAudio from "../../../assets/audio/ClassBook/Grade 4/cd21pg29-reading-adult-lady_kTOz5nD3.mp3";
import ReadingSection from "../ReadingSection";

import img from"../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 28/SVG/Asset 25.svg";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "What kinds of things will be invented in the future? Many people like to talk about what will happen in the future. Will there be things that we won't use anymore? There are some people who like to think about the future. They are building a museum. It will be called the Museum of Future Inventions.",
    "This museum will show scientists' ideas about future technology. There will be tiny phones, and their screens will be projected. There will be new computers and games at this museum. Some of the items won't actually work because they haven't been invented yet! But they will be possibilities for the future. There will be a large room like a library of the future. Do you think there will be more books or more computers in that room? There will be ideas for a future cinema at this museum too. There will even be an idea room for students. They will be able to give their ideas for future inventions. The museum will choose the best ideas and put them in the museum. Is there an idea that you would like to send to the Museum of Future Inventions?",
  ];
const captions = [
  {
    start: 0.60,
    end: 6.70,
    text: "Page 29 reading. How is the air around you? Is it cold or hot right now?",
  },
  {
    start: 6.70,
    end: 12.30,
    text: "The Earth's atmosphere. What are the hottest and the coldest places on Earth?",
  },
  {
    start: 12.30,
    end: 17.10,
    text: "The places actually aren't on Earth, but they are in Earth's atmosphere.",
  },
  {
    start: 17.10,
    end: 20.94,
    text: "The atmosphere is a layer of gases around the Earth.",
  },
  {
    start: 20.94,
    end: 26.04,
    text: "They act like a blanket to keep in some of the sun's heat and energy.",
  },
  {
    start: 27.50,
    end: 31.68,
    text: "The layer of atmosphere closest to the Earth is the troposphere.",
  },
  {
    start: 31.68,
    end: 34.34,
    text: "This is where all the weather happens.",
  },
  {
    start: 35.36,
    end: 37.30,
    text: "The next layer is the stratosphere.",
  },
  {
    start: 37.30,
    end: 45.40,
    text: "Planes will sometimes fly into the stratosphere because there are no clouds there, and there is less wind to push against an airplane.",
  },
  {
    start: 48.00,
    end: 51.92,
    text: "The third layer is the mesosphere. It is the coldest layer.",
  },
  {
    start: 51.92,
    end: 57.22,
    text: "Temperatures will sometimes get lower than negative 100 degrees Celsius.",
  },
  {
    start: 58.68,
    end: 60.62,
    text: "Finally comes the thermosphere.",
  },
  {
    start: 60.62,
    end: 70.44,
    text: "Surprisingly, the atmosphere goes from the coldest place to the hottest place in this layer. It can get as hot as 2,000 degrees Celsius.",
  },
  {
    start: 72.20,
    end: 76.94,
    text: "All parts of the Earth's atmosphere are important, so it's important to take care of it.",
  },
];
  return (
    
    <div className="flex flex-col items-center">
        <div className="w-[60%]">
      <ReadingSection
        mainTitle="How is the air around you? Is it cold or hot right now?  "
         title="Inventions of the Future"
        image={imgReading}
        image1= {img}
        question="Do you think new inventions will be good or bad for Earth?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={6.8}
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