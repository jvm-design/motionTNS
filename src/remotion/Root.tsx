import { Composition } from 'remotion';
import { LogoReveal } from './LogoReveal';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LogoReveal"
      component={LogoReveal}
      durationInFrames={210}
      fps={60}
      width={1080}
      height={1080}
    />
  );
};
