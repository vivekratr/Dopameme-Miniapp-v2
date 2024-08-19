import Home from "../pages/Home";
import MemeTemplateDisplay from "../pages/MemeType";
import Choose from "../pages/Choose";
import Main from "../pages/Main1";
import Output from "../pages/Output";
import PromptToMeme_input from "../pages/PromptToMeme_input";
import Video_Meme_Input from "../pages/Video_Meme_Input";
import Video_Output from "../pages/Video_Output";
import TrendingMemes from "../pages/MemeTrending";
import Game from "../components/Game";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Explore from "@/pages/Explore";

export const routes = [
  { path: "/", Component: Home },
  { path: "/game", Component: Game },
  { path: "/home", Component: Home },
  { path: "/explore", Component: Explore },
  { path: "/trending", Component: TrendingMemes, title: "Trending Memes" },
  { path: "/register", Component: Register, title: "Register" },
  {
    path: "/vid-input",
    Component: Video_Meme_Input,
    title: "Video Meme Input",
  },
  { path: "/vid-output", Component: Video_Output, title: "Video Output" },
  { path: "/output", Component: Output },
  { path: "/profile", Component: Profile },
  { path: "/choose", Component: Choose },
  { path: "/prompt-to-meme1", Component: PromptToMeme_input },
  { path: "/imgupload", Component: Main },
  { path: "/type", Component: MemeTemplateDisplay },
];
