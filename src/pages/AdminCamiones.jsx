import { useEffect, useMemo, useState } from "react";
import CamionCardAdmin from "../components/ui/CamionCardAdmin";


import "../css/admin.css"
import trucks from "../data/camiones";

// Clave de almacenamiento local para persistir disponibilidad
const STORAGE_KEY = "flota_disponibilidad";

function loadDisponibilidadInicial(fleet) { 
    try { 
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        // Filtra por ids vigentes por si la flota cambió
        if (!parsed || typeof parsed !== "object") return {};
        const valid = {};

        for (const camion of fleet) { 
            if (Object.prototype.hasOwnProperty.call(parsed, camion.id)) { 
                valid[camion.id] = !!parsed[camion.id];
            }
        }
        return valid;
    } catch {
        return {}; 
    }
}

function saveDisponibilidad(map) { 
    try { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch { 
        // No hacer nada si falla
    }
}

export default function AdminCamiones() { 
    // 1.- Carga base
    const flotaBase = trucks;

    // 2.- Estado de disponibilidad
    const[disponibilidad, setDisponibilidad] = useState( () => 
        loadDisponibilidadInicial(flotaBase)
    );

    // 3.- Proyección de flota.
    const flota = useMemo( () => { 
        return flotaBase.map( (c) => ({ 
            ...c,
            // Si hay estado persistido, úsalo; si no, por defecto disponible = true salvo que venga definido en datos
            disponible:
                disponibilidad[c.id] !== undefined 
                ? disponibilidad[c.id] 
                : (c.disponible !== undefined ? !!c.disponible : true),
        }));

    }, [flotaBase, disponibilidad]);

    // 4.- Persistencia
    useEffect( () => { 
        saveDisponibilidad(disponibilidad);
    }, [disponibilidad]);

    const toggleDisponibilidad = (id) => { 
        setDisponibilidad( (prev) => { 
            const current = prev[id];
            return { ...prev, [id]: current === undefined ? false : !current};
        });
    };

    return (
        <section className= "admin-camiones page">
            <header className= "admin-header">
                <h1>Administrar Camiones</h1>
                <p className= "muted">Cambia rápidamente la disponibilidad de cada unidad.</p>
            </header>
            
            <div className="grid-camiones">
                {flota.map( (camion) => (
                    <CamionCardAdmin
                        key={camion.id}
                        camion={camion}
                        onToggle={ () => toggleDisponibilidad(camion.id)}
                    />
                ))}
        </div>
        </section>
    );
}