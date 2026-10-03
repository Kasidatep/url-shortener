'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import LinkSculpture from './LinkSculpture';
import type { JourneyScene } from '@/lib/link-journey-scene';
const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (changed: () => void) => {
  const media = matchMedia(motionQuery);
  media.addEventListener('change', changed);
  return () => media.removeEventListener('change', changed);
};
const readMotion = () => matchMedia(motionQuery).matches;
const serverMotion = () => true;
function JourneyCanvas({ stage, replay }: { stage: number; replay: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<JourneyScene | null>(null);
  const current = useRef(stage);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let disposed = false;
    let instance: JourneyScene | null = null;
    async function mount() {
      try {
        const { createJourneyScene } = await import('@/lib/link-journey-scene');
        if (disposed || !canvas.current) return;
        instance = createJourneyScene(canvas.current, current.current, () => {
          if (!disposed) setReady(false);
        });
        scene.current = instance;
        setReady(true);
      } catch {
        /* Keep the illustrated story if WebGL is unavailable. */
      }
    }
    void mount();
    return () => {
      disposed = true;
      instance?.dispose();
      scene.current = null;
    };
  }, []);
  useEffect(() => {
    current.current = stage;
    scene.current?.setStage(stage);
  }, [stage, replay]);
  return (
    <div className="journey-viewport" data-ready={ready} data-stage={stage}>
      <div className="journey-fallback">
        <LinkSculpture stage={stage} />
      </div>
      <canvas ref={canvas} className="journey-canvas" aria-hidden="true" />
      <div className="journey-halo" aria-hidden="true" />
    </div>
  );
}
export default function LinkJourney3D({
  stage,
  replay,
}: {
  stage: number;
  replay: number;
}) {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    readMotion,
    serverMotion,
  );
  // Unmount the canvas when preferences change so a lost context is never reused.
  return reduced ? (
    <div className="journey-viewport" data-ready="false" data-stage={stage}>
      <div className="journey-fallback">
        <LinkSculpture stage={stage} />
      </div>
      <div className="journey-halo" aria-hidden="true" />
    </div>
  ) : (
    <JourneyCanvas stage={stage} replay={replay} />
  );
}
