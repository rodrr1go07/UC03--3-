import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="cinema-scene">
                    <div className="film-reel reel-1">🎬</div>
                    <div className="film-reel reel-2">🎞️</div>
                    <div className="film-reel reel-3">🎬</div>
                </div>

                <h1 className="error-code">404</h1>
                <h2 className="error-title">Cena não encontrada!</h2>
                <p className="error-description">
                    Parece que você tentou acessar um filme que não existe em nosso catálogo.
                    <br />
                    A sessão foi encerrada ou o link está quebrado.
                </p>

                <div className="broken-film-strip">
                    <span>🎥</span>
                    <span>✂️</span>
                    <span>🎥</span>
                </div>

                <Link to="/" className="btn-return">
                    🎬 Voltar ao Catálogo
                </Link>

                <div className="cinema-lights">
                    <div className="light"></div>
                    <div className="light"></div>
                    <div className="light"></div>
                    <div className="light"></div>
                    <div className="light"></div>
                </div>
            </div>
        </div>
    );
}
