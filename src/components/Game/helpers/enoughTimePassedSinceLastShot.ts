export const enoughTimePassedSinceLastShot: (
  fireRatePerSecond: number,
  lastTimePlayerShot: number
) => boolean = (fireRatePerSecond, lastTimePlayerShot) => {
  const timeForOneShot = 1000 / fireRatePerSecond;
  console.log(timeForOneShot, Date.now(), lastTimePlayerShot);
  return timeForOneShot < Date.now() - lastTimePlayerShot;
};
