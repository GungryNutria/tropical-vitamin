import { useRef, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const WIDE = '(min-width: 768px)';
const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useWide = () =>
  useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches);

interface Props {
  title: string;
  images: string[];
  index: number;
  onIndex: (i: number) => void;
}

const SWIPE_PX = 40;

export default function TourGallery({ title, images, index, onIndex }: Props) {
  const { t } = useTranslation();
  const wide = useWide();
  const startX = useRef<number | null>(null);
  const total = images.length;
  const many = total > 1;
  const go = (i: number) => onIndex((i + total) % total);

  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) >= SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="td-gallery" role="group" aria-label={t('tours.dialog.gallery')}>
      <div
        className="td-stage"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        {/* Solo se monta la foto actual: la primera no espera a las demás */}
        <img
          key={index}
          src={images[index]}
          alt={t('tours.dialog.photoAlt', { tour: title, i: index + 1, n: total })}
          draggable={false}
        />
        {many && (
          <>
            <button
              type="button"
              className="td-arrow td-arrow--prev"
              aria-label={t('tours.dialog.prev')}
              onClick={() => go(index - 1)}
            >
              <LuChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="td-arrow td-arrow--next"
              aria-label={t('tours.dialog.next')}
              onClick={() => go(index + 1)}
            >
              <LuChevronRight aria-hidden="true" />
            </button>
            <span className="td-counter" aria-live="polite">
              {t('tours.dialog.counter', { i: index + 1, n: total })}
            </span>
          </>
        )}
      </div>
      {many && wide && (
        <ul className="td-thumbs">
          {images.map((src, i) => (
            <li key={i}>
              <button
                type="button"
                className="td-thumb"
                aria-label={t('tours.dialog.thumb', { i: i + 1, n: total })}
                aria-current={i === index}
                onClick={() => onIndex(i)}
              >
                <img src={src} alt="" loading="lazy" draggable={false} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
