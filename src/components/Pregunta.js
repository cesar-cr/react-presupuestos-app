import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    // definir state
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    // leer el presupuesto que ingresa el usuario
    const definirPresupuesto = e => {
        setCantidad(parseInt(e.target.value), 10);
    }

    // submit para agregar el presupuesto
    const agregarPresupuesto = (e) => {
        e.preventDefault();

        // validar
        if (cantidad < 1 || isNaN(cantidad)) {
            setError(true);
            return;
        }

        setError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
        // si pasa la validacion

    }

    return (
        <>
            <h2> Coloca tu presupuesto </h2>

            { error && <Error mensaje="Hubo un problema con el presupuesto" /> }

            <form
                onSubmit={ agregarPresupuesto }
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={ definirPresupuesto }
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </>
    )
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;
