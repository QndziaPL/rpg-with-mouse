import React, { useCallback, useState } from "react";
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

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { width, height } = size;

  const onPlayerMouseClick = () => {
    console.log("clicked");
  };

  const { mouseDown, playerMovementKeys, mousePosition } = usePlayerInput({
    onPlayerMouseClick,
  });

  const update = () => {
    player.movePlayer(playerMovementKeys);
  };

  return (
    <>
      <GameCanvas
        update={update}
        size={size}
        setSize={setSize}
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
