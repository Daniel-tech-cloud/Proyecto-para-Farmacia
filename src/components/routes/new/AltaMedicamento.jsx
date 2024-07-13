
export const AltaMedicamento = () => {
    return (
        <>
        <div class="bg-form">
            <h2 class="font-title">Nuevo Medicamento</h2>
            <form class="row">
                <div class="col-12 col-md-6 mb-3">
                    <label for="name" class="font-form form-label">Nombre</label>
                    <input type="text" id="name" class="form-control" placeholder="Ingresa el nombre del medicamento"/>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <label for="substance" class="font-form form-label">Sustancia</label>
                    <select id="substance" class="font-ddl form-select">
                        <option value="">Selecciona la sustancia</option>
                        <option value="paracetamol">Paracetamol</option>
                        <option value="ibuprofeno">Ibuprofeno</option>
                        <option value="aspirina">Aspirina</option>
                    </select>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <label for="presentation" class="font-form form-label">Presentación</label>
                    <select id="presentation" class="font-ddl form-select">
                        <option value="">Selecciona la presentación</option>
                        <option value="comprimidos">Comprimidos</option>
                        <option value="capsulas">Cápsulas</option>
                        <option value="jarabe">Jarabe</option>
                    </select>
                </div>
                <div class="col-12 col-md-6 mb-3">
                    <label for="laboratory" class="font-form form-label">Laboratorio</label>
                    <select id="laboratory" class="font-ddl form-select">
                        <option value="">Selecciona el laboratorio</option>
                        <option value="pfizer">Pfizer</option>
                        <option value="roche">Roche</option>
                        <option value="bayer">Bayer</option>
                    </select>
                </div>
                <div class="col-12 mb-3">
                    <label for="description" class="font-form form-label">Descripción</label>
                    <textarea id="description" class="form-control" rows="3" placeholder="Ingresa la descripción del medicamento"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label for="indications" class="font-form form-label">Indicaciones</label>
                    <textarea id="indications" class="form-control" rows="3" placeholder="Ingresa las indicaciones del medicamento"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label for="image" class="font-form form-label">Imagen</label>
                    <input type="file" id="image" class="form-control"/>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-submit">Guardar</button>
                </div>
            </form>
        </div>
        </>
    )
}
