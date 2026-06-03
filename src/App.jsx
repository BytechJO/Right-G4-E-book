import Book from "./component/Book";
import { AudioProvider } from "./context/AudioContext";
import OrientationGate from "./component/OrientationGate";
function App() {
  return (
    <>
    <OrientationGate>
      <AudioProvider>
        <Book />
      </AudioProvider>
      </OrientationGate>
    </>
  );
}

export default App;
