import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Error from './Error';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    // cuando el usuario agrega un gasto
    const agregarGasto = (e) => {
        e.preventDefault();
        // validar
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        // quitar el error
        guardarError(false);
        // construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: uuidv4()
        };
        // pasar el gasto a complemento
        guardarGasto(gasto);
        // resetear
        guardarNombre('');
        guardarCantidad(0);
        guardarCrearGasto(true);
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error && <Error mensaje="Ambos campos son requeridos y el gasto debe ser valido" /> }

            <div className="campo">
                <label>Nombre del gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. en pasajes"
                    value={nombre}
                    onChange={ (e) => guardarNombre(e.target.value) }
                />
            </div>

            <div className="campo">
                <label>Cantidad gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 100"
                    value={cantidad}
                    onChange={ (e) => guardarCantidad(e.target.value) }
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    )
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}


export default Formulario;
