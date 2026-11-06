import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';
import TourGallery from './tourGallery';
import QuoteForm from './quoteForm';
import { useModalDialog } from '../../../hooks/useModalDialog';

export type DialogView = 'gallery' | 'quote';

interface Props {
  title: string;
  category: string;
  description: string;
  images: string[];
  initialView: DialogView;
  onClose: () => void;
}

export default function TourDialog({ title, category, description, images, initialView, onClose }: Props) {
  const { t } = useTranslation();
  const { ref: dialogRef, close, onBackdropClick } = useModalDialog();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [view, setView] = useState<DialogView>(initialView);
  const [index, setIndex] = useState(0);
  // "Volver a las fotos" solo si se entró por la galería
  const [fromGallery, setFromGallery] = useState(false);
  const total = images.length;

  // Al abrir y al cambiar de vista, el foco va al título del diálogo
  useEffect(() => {
    headingRef.current?.focus();
  }, [view]);

  const goQuote = () => {
    setFromGallery(view === 'gallery');
    setView('quote');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (view !== 'gallery' || total < 2) return;
    if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
    if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total);
  };

  const closeBtn = (
    <button type="button" className="td-close" onClick={close}>
      {t('tours.dialog.close')}
    </button>
  );

  return (
    <dialog
      ref={dialogRef}
      className="tour-dialog"
      aria-labelledby="td-heading"
      onClose={onClose}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
    >
      {view === 'gallery' ? (
        <div className="td-view td-view--gallery">
          <div className="td-top td-top--over">{closeBtn}</div>
          <div className="td-scroll">
            <TourGallery title={title} images={images} index={index} onIndex={setIndex} />
            <div className="td-info">
              <span className="tour-category">{category}</span>
              <h2 className="td-name" id="td-heading" tabIndex={-1} ref={headingRef}>{title}</h2>
              <p className="td-desc">{description}</p>
            </div>
          </div>
          <div className="td-cta">
            <button type="button" className="tour-button" onClick={goQuote}>{t('tours.book')}</button>
          </div>
        </div>
      ) : (
        <div className="td-view td-view--quote">
          <div className="td-top">
            {fromGallery ? (
              <button type="button" className="td-close td-back" onClick={() => setView('gallery')}>
                <LuArrowLeft aria-hidden="true" /> {t('tours.quote.back')}
              </button>
            ) : (
              <span />
            )}
            {closeBtn}
          </div>
          <div className="td-summary">
            <img src={images[0]} alt="" />
            <div>
              <span className="tour-category">{category}</span>
              <p className="td-name">{title}</p>
            </div>
          </div>
          <QuoteForm tourTitle={title} titleId="td-heading" titleRef={headingRef} />
        </div>
      )}
    </dialog>
  );
}
