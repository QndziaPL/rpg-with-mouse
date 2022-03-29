import React, { useState } from "react";
import GameCanvas from "./GameCanvas";
import { usePlayerInput } from "../playerInputs/usePlayerInput";
import GameState from "../classes/GameState";
import Player from "../classes/Player";
import { draw } from "../draw/draw";

const gameState = new GameState();
const player = new Player();
const Game = () => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { width, height } = windowSize;

  const onPlayerMouseClick = () => {
    console.log("clicked");
  };

  const onNextWeaponClick = () => {
    player.pickNextWeapon();
  };

  const { mouseDown, playerMovementKeys, mousePosition } = usePlayerInput({
    onPlayerMouseClick,
    onNextWeaponClick,
  });

  const update = () => {
    player.movePlayer(playerMovementKeys);
    shoot();
    gameState.movePlayerProjectiles(windowSize);
  };

  const shoot = () => {
    gameState.shoot(mouseDown, player, mousePosition);
  };

  console.log(gameState.playerProjectiles);

  return (
    <>
      <GameCanvas
        update={update}
        size={windowSize}
        setSize={setWindowSize}
        draw={(ctx) =>
          draw({ ctx, player, gameState, mouseDown, mousePosition })
        }
        setCanvasContext={setCanvasContext}
        canvasContext={canvasContext}
      />
    </>
  );
};

export default Game;
