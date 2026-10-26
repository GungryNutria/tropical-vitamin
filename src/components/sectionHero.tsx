import '../css/sectionHero.css';
import logo from '../assets/logo.png';

export default function SectionHero(props: { title: string, subtitle: string, text: string, backgroundImage: string }) {
    return (
        <div className="section-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(10, 10, 10, 0.6) 0%, rgba(20, 20, 20, 0.6) 100%), url(${props.backgroundImage})` }}>
            <div className="section-hero-content">
                <div className="section-brand">
                    <span className="section-brand-title">{props.title}</span>
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