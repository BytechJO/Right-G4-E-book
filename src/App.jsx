import Book from "./component/Book";
import { AudioProvider } from "./context/AudioContext";

function App() {

  return (
    <>
    <AudioProvider>

      <Book />
          </AudioProvider>

    </>
  );
}

export default App;
