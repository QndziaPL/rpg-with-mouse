import { AssetImageName, AssetImageToLoad } from "../assets/useGameAssets";
import gandalf from "../assets/gunDalff.png";
import rock from "../assets/rock.png";
import tree from "../assets/tree.png";
import sausages from "../assets/sausages.png";

export const IMAGES_TO_LOAD: AssetImageToLoad[] = [
  { name: AssetImageName.PLAYER_SKIN_GANDALF, url: gandalf },
  { name: AssetImageName.OBSTACLE_ROCK, url: rock },
  { name: AssetImageName.OBSTACLE_TREE, url: tree },
  { name: AssetImageName.PROJECTILE_SAUSAGES, url: sausages },
];
