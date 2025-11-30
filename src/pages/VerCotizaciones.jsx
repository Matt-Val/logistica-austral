import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { cotizacionService } from "../services/cotizacionService";
import PopupConfirmarEstado from "../components/ui/PopupConfirmarEstado";

// estado y colores (bs)
const ESTADOS = [
	{ value: "Pendiente", label: "Pendiente", color: "warning" },
	{ value: "Aprobada", label: "Aprobada", color: "success" },
	{ value: "Rechazada", label: "Rechazada", color: "danger" },
	{ value: "Finalizada", label: "Finalizada", color: "info"},
];

/**
 * Ver cotizaciones como administrador, se puede revisar los arriendos hechos, y cambiar estados
 * 
 */
export default function VerCotizaciones() {
	// para eliminar cotizacion con service 
	const [eliminandoId, setEliminandoId] = useState(null);

	const handleEliminar = async (id) => {
		if (!id || id === "-") return;
		try {
			setEliminandoId(id);
			await cotizacionService.eliminarCotizacion(id);
			setCotizaciones(prev => prev.filter(c => String(c.idCotizacion ?? c.id) !== String(id)));
			setFiltered(prev => prev.filter(c => String(c.idCotizacion ?? c.id) !== String(id)));
		} catch (err) {
			alert("Error al eliminar la cotización");
		} finally {
			setEliminandoId(null);
		}
	};
	// crea fila por fila la tabla de cotizacion
	function tablaCotizacion(coti, idx, arr) {
		const id = coti.idCotizacion ?? coti.id ?? "-";
		const cliente = coti.nombreClienteCotizacion ?? "-";
		const rut = coti.rutClienteCotizacion ?? "-";
		const telefono = coti.telefonoClienteCotizacion ?? "-";
		const email = coti.correoClienteCotizacion ?? "-";
		const region = coti.regionCotizacion ?? "-";
		const fechaInicio = coti.fechaInicioCotizacion ?? "";
		const estado = coti.estadoCotizacion ?? "Pendiente";
		const agregado = coti.fechaSolicitudCotizacion ?? "";
		const estadoObj = ESTADOS.find(e => e.value === estado) || ESTADOS[0];
		
		return (
			<tr key={id}>
				<td>{id}</td>
				<td>{cliente}</td>
				<td>{rut}</td>
				<td>{telefono}</td>
				<td>{email}</td>
				<td>{region}</td>
				<td>{fechaInicio ? String(fechaInicio).slice(0, 10) : ""}</td>
				<td>
					<div className="dropdown">
						<button
							className={`btn btn-sm btn-${estadoObj.color} dropdown-toggle w-100`}
							type="button"
							id={`dropdownEstado-${id}`}
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{estadoObj.label}
						</button>
						<ul className="dropdown-menu" aria-labelledby={`dropdownEstado-${id}`}>
							{ESTADOS.filter(e => e.value !== estado).map(e => (
								<li key={e.value}>
									<button
										className={`dropdown-item text-${e.color}`}
										onClick={() => handleEstadoClick(id, e.value)}
									>
										{e.label}
									</button>
								</li>
							))}
						</ul>
					</div>
				</td>
				<td>{agregado ? String(agregado).slice(0, 10) : ""}</td>
				<td className="text-end">
					<button
						className="btn btn-sm btn-outline-danger"
						disabled={eliminandoId === id}
						onClick={() => handleEliminar(id)}
						title="Eliminar cotización"
					>
						{eliminandoId === id && (
							<span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
						)}
						Eliminar
					</button>
				</td>
			</tr>
		);
	}

	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	// se requiere ser admin
	if (!user) return <Navigate to="/login" replace />;
	const normalized = String(user.correo || user.email || "").toLowerCase();
	const isAdmin = user?.isAdmin === true || normalized === "javier.pena@logistica.com";
	if (!isAdmin) return <Navigate to="/login" replace />;

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [cotizaciones, setCotizaciones] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [searchId, setSearchId] = useState("");
	const [popup, setPopup] = useState({ abierto: false, id: null, nuevoEstado: null });
	const [confirmando, setConfirmando] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await cotizacionService.obtenerTodas();
				const lista = Array.isArray(data) ? data : [];
				setCotizaciones(lista);
				setFiltered(lista);
			} catch (err) {
				console.error(err);
				setError("Error al cargar cotizaciones");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);


	// maneja click en dropdown de estado
	const handleEstadoClick = (id, nuevoEstado) => {
		setPopup({ abierto: true, id, nuevoEstado });
	};

	// confirmar cambio de estado de la coti
	const handleConfirmarEstado = async () => {
		const { id, nuevoEstado } = popup;
		setConfirmando(true);
		try {
			await cotizacionService.cambiarEstado(id, nuevoEstado);
			// actualizar en la tabla con el service
			setCotizaciones(prev => prev.map(coti =>
				(String(coti.idCotizacion ?? coti.id) === String(id))
					? { ...coti, estadoCotizacion: nuevoEstado }
					: coti
			));
			setFiltered(prev => prev.map(coti =>
				(String(coti.idCotizacion ?? coti.id) === String(id))
					? { ...coti, estadoCotizacion: nuevoEstado }
					: coti
			));
		} catch (err) {
			alert("Error al cambiar estado");
		} finally {
			setConfirmando(false);
			setPopup({ abierto: false, id: null, nuevoEstado: null });
		}
	};

	const handleSearchId = () => {
		const term = searchId.trim();
		if (!term) {
			setFiltered(cotizaciones);
			return;
		}
		// coincidencia parcial por comodidad
		const nueva = cotizaciones.filter(c => {
			const idVal = String(c.idCotizacion ?? c.id ?? "");
			return idVal.includes(term);
		});
		setFiltered(nueva);
	};

	return (
		<div className="container py-4">
			<div className="row justify-content-center">
				<section className="col-12">
					<div className="card shadow-sm">
						<div className="card-body">
							<h2 className="fw-bold mb-2">Cotizaciones</h2>
							<p className="text-secondary mb-3">Listado de cotizaciones registradas en el sistema.</p>

							{/* barra busqueda por id de cotizacion */}
							<div className="d-flex align-items-center mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Filtrar por ID"
									style={{ maxWidth: "240px" }}
									value={searchId}
									onChange={(e) => setSearchId(e.target.value)}
									onKeyDown={(e) => { if (e.key === 'Enter') handleSearchId(); }}
								/>
								<button className="btn btn-secondary ms-2" onClick={handleSearchId}>Buscar</button>
								{searchId && (
									<button className="btn btn-outline-danger ms-2" onClick={() => { setSearchId(""); setFiltered(cotizaciones); }}>Limpiar</button>
								)}
							</div>

							{loading && <div className="alert alert-info">Cargando cotizaciones...</div>}
							{error && <div className="alert alert-danger">{error}</div>}

							{!loading && !error && (
								<div className="table-responsive">
									<table className="table table-striped align-middle">
										<thead className="table-light">
											<tr>
												<th>ID</th>
												<th>Cliente</th>
												<th>RUT</th>
												<th>Teléfono</th>
												<th>Email</th>
												<th>Región</th>
												<th>Fecha inicio</th>
												<th>Estado</th>
												<th>Fecha de solicitud</th>
												<th className="text-end">Acciones</th>
											</tr>
										</thead>
										<tbody>
											{filtered.map(tablaCotizacion)}
										</tbody>
									</table>
								</div>
							)}
							<PopupConfirmarEstado
								show={popup.abierto}
								onClose={() => setPopup({ abierto: false, id: null, nuevoEstado: null })}
								onConfirm={handleConfirmarEstado}
								nuevoEstado={popup.nuevoEstado}
								confirming={confirmando}
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

