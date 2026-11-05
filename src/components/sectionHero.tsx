import '../css/sectionHero.css';
import logo from '../assets/logo.png';

export default function SectionHero(props: { title: string, subtitle: string, text: string, backgroundImage?: string, collage?: string[], overlay?: number }) {
    const o = props.overlay ?? 0.6;
    const longWord = props.title.split(/\s+/).some((w) => w.length > 13);
    const tint = `linear-gradient(135deg, rgba(10, 10, 10, ${o}) 0%, rgba(20, 20, 20, ${o}) 100%)`;
    return (
        <div className="section-hero" style={{ backgroundImage: props.backgroundImage ? `${tint}, url(${props.backgroundImage})` : tint, '--hero-tint': tint } as React.CSSProperties}>
            {props.collage && (
                <div className="section-hero-collage" aria-hidden="true">
                    {props.collage.map((src) => <img key={src} src={src} alt="" />)}
                </div>
            )}
            <div className="section-hero-content">
                <div className="section-brand">
                    <span className={`section-brand-title${longWord ? ' section-brand-title--long' : ''}`}>{props.title}</span>
                    <div className="section-brand-logo">
                        <img src={logo} alt="Tropical Vitamin"/>
                    </div>
                </div>
                <p className="section-hero-subtitle">{props.subtitle}</p>
                <p className="section-hero-text" dangerouslySetInnerHTML={{ __html: props.text }} />
            </div>
        </div>
    )
}