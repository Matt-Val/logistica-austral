import React from "react";

// Helpers para tolerar distintas claves en los datos
const pick = (obj, keys) => keys.find((k) => obj?.[k] !== undefined);
const text = (obj, keys, fallback = "") => (obj ? obj[pick(obj, keys)] ?? fallback : fallback);

export default function CamionCardAdmin({ camion, onToggle }) {
    const title = text(camion, ["nombre", "modelo", "titulo", "name", "title"], "Camión");
    const img = text(camion, ["imagen", "image", "img", "foto"], "");
    const desc = text(camion, ["descripcion", "description", "detalle"], "");
    const disponible = !!camion?.disponible;

    return (
        <article className="camion-card-admin">
            <div className="thumb">
                {img ? (
                    <img src={img} alt={title} loading="lazy" />
                ) : (
                <div className="thumb placeholder">Sin imagen</div>
                )}
                <span className={`status-badge ${disponible ? "disponible" : "no-disponible"}`}>
                    {disponible ? "Disponible" : "No disponible"}
                </span>
            </div>

            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                {desc && <p className="card-desc">{desc}</p>}
            </div>

            <div className="card-actions">
                <button
                    type="button"
                    className={`btn btn-toggle ${disponible ? "on" : "off"}`}
                    onClick={onToggle}
                >
                {disponible ? "Marcar como No disponible" : "Marcar como Disponible"}
                </button>
            </div>
    </article>
    );
}