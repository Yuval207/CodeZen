import "./App.css";
import Problems from "./components/Problems";
import Signin from "./components/Signin";
import Topbar from "./components/Topbar";
import Button from "./components/Button";
import Lottie from "lottie-react";
import homePageAnimation from "./assets/homePageAnimation.json";

function App() {
  return (
    <div>
      <Topbar />
      <div className="flex justify-between min-h-screen mt-10">
        <div className="md:w-1/2 md:ml-8 ">
          <Lottie animationData={homePageAnimation} />
        </div>

        <div className="w-1/2 m-4 h-96 bg-blue-950 mockup-code">
          <pre data-prefix="$">
            <code>Unlock Your Coding Potential with CodeZen!</code>
          </pre>
          <pre data-prefix=">" className="text-warning">
            <code>
              Join a community of passionate coders, sharpen your skills, and
              conquer coding challenges.
            </code>
          </pre>
          <pre data-prefix=">" className="text-success">
            <code>
              Whether you're a beginner or a seasoned developer CodeZen,
            </code>
          </pre>
          <pre data-prefix=">" className="text-success">
            <code>
              is your gateway to mastering algorithms and honing your
              problem-solving prowess.
            </code>
          </pre>
          <pre data-prefix=">" className="text-success">
            <code>Get ready to level up your coding journey!</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
