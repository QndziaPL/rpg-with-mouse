import React, { useEffect, useLayoutEffect, useRef, VFC } from "react";

interface Props {
  canvasContext: CanvasRenderingContext2D | null;
  setCanvasContext: React.Dispatch<
    React.SetStateAction<CanvasRenderingContext2D | null>
  >;
  draw: (ctx: CanvasRenderingContext2D) => void;
  size: { width: number; height: number };
  setSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  update: () => void;
}

const FRAMERATE = 60;

const GameCanvas: VFC<Props> = ({
  canvasContext,
  setCanvasContext,
  draw,
  size,
  setSize,
  update,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      setCanvasContext(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef, setCanvasContext]);

  useEffect(() => {
    let animationFrameId = 0;
    let lastFrameTimestamp = 0;
    const render = (timestamp = 0) => {
      if (timestamp > lastFrameTimestamp - 1000 / FRAMERATE) {
        draw(canvasContext!);
        animationFrameId = window.requestAnimationFrame(render);
        lastFrameTimestamp = timestamp;
        update();
      }
    };

    if (canvasContext) {
      render();
    }
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw, canvasContext]);

  return (
    <canvas
      width={size.width}
      height={size.height}
      data-testid="gameCanvas"
      ref={canvasRef}
    />
  );
};

export default GameCanvas;
