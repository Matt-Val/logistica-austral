import { useEffect, useState } from "react";
import CamionCardAdmin from "../components/ui/CamionCardAdmin";
import { camionService } from "../services/camionService";
import "../css/admin.css"

export default function AdminCamiones() { 
    const [flota, setFlota] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => { 
        cargarFlota();
    },[]);

    const cargarFlota = async () => { 
        try { 
            setLoading(true);
            const data = await camionService.getAdminCamiones(); 
            setFlota(data);
        } catch (error) { 
            console.error("Error al cargar la flota: ", error);
            alert("No se pudo cargar la lista.")
        } finally { 
            setLoading(false);
        }
    };

    // Funcion para cambiar la disponibilidad
    const toggleDisponibilidad = async (camion) => { 
        try { 
            const nuevoEstado = { ...camion, disponible: !camion.disponible};
            await camionService.updateCamion(camion.id, nuevoEstado);

            setFlota( prevFlota =>
                prevFlota.map( c => c.id === camion.id ? nuevoEstado : c)
            );
        }catch (error) { 
            console.error("Error al actualizar: ", error);
            alert("No se pudo actualizar. Intente nuevamente.");
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando panel...</div>

    return (
    <section className= "admin-camiones page">
        <header className= "admin-header">
            <h1>Administrar Camiones</h1>
            <p className= "muted">Gestiona la disponibilidad de tu flota.</p>
        </header>
            
        <div className="grid-camiones">
            {flota.map( (camion) => (
                <CamionCardAdmin
                    key={camion.id}
                    camion={camion}
                    onToggle={ () => toggleDisponibilidad(camion)} 
                />
            ))}
        </div>
    </section>
    );
}