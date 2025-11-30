import React from "react";

/**
 * Popup para confirmar cambio de estado de una cotizacion.
 * 
 *  - show: boolean para mostrar u ocultar el popup
 *  - nuevoEstado: string con el estado objetivo
 *  - confirming: boolean (opcional) indica si se esta procesando
 *  - onConfirm: confirmacion
 *  - onClose:  para cerrar
 */
export default function PopupConfirmarEstado({ 
    show, 
    nuevoEstado, 
    confirming = false, 
    onConfirm, 
    onClose 
}) {
	if (!show) return null;
	return (
		<div className="popup-capa" role="dialog" aria-modal="true">
			<div className="popup-contenido shadow">
				<div className="text-center mb-3">
					<div className="popup-check mb-2">⚠️</div>
					<h4>Confirmar cambio de estado</h4>
				</div>
				   <div className="mb-3 small text-center">
					   ¿Seguro que deseas cambiar el estado a <strong>{nuevoEstado}</strong>?
				   </div>
				<div className="d-flex gap-2 justify-content-center mt-4">
					<button
						className="btn btn-success"
						onClick={onConfirm}
						disabled={confirming}
					>
                        {/** el  spinner */}
						{confirming && (
							<span
								className="spinner-border spinner-border-sm me-2"
								role="status"
								aria-hidden="true"
							></span>
						)}	
						{confirming ? 'Confirmando...' : 'Confirmar'}
					</button>
					<button className="btn btn-dark" onClick={onClose} disabled={confirming}>Cancelar</button>
				</div>
			</div>
		</div>
	);
}

