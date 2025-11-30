import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { cotizacionService } from "../services/cotizacionService";

// crea fila por fila la tabla de cotizacion
function tablaCotizacion(coti) {
	const id = coti.idCotizacion ?? coti.id ?? "-";
	const cliente = coti.nombreClienteCotizacion ?? "-";
	const rut = coti.rutClienteCotizacion ?? "-";
	const telefono = coti.telefonoClienteCotizacion ?? "-";
	const email = coti.correoClienteCotizacion ?? "-";
	const region = coti.regionCotizacion ?? "-";
	const fechaInicio = coti.fechaInicioCotizacion ?? "";
	const estado = coti.estadoCotizacion ?? "Pendiente";
	const agregado = coti.fechaSolicitudCotizacion ?? "";
	return (
		<tr key={id}>
			<td>{id}</td>
			<td>{cliente}</td>
			<td>{rut}</td>
			<td>{telefono}</td>
			<td>{email}</td>
			<td>{region}</td>
			<td>{fechaInicio ? String(fechaInicio).slice(0, 10) : ""}</td>
			<td>{estado}</td>
			<td>{agregado ? String(agregado).slice(0, 10) : ""}</td>
		</tr>
	);
}

/**
 * Ver cotizaciones como administrador, se puede revisar los arriendos hechos, y cambiar estados
 * 
 */
export default function VerCotizaciones() {
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
												<th>Agregado</th>
											</tr>
										</thead>
										<tbody>
											{filtered.map(tablaCotizacion)}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

