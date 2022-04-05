export const notEnoughTimePassedSinceLastShot: (
  fireRatePerSecond: number,
  lastTimePlayerShot: number
) => boolean = (fireRatePerSecond, lastTimePlayerShot) => {
  const timeForOneShot = 1000 / fireRatePerSecond;
  return Date.now() - lastTimePlayerShot < timeForOneShot;
};
