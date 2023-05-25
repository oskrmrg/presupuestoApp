function enviarPresupuesto(){
    let montoTxtPresupuesto = document.getElementById('boxPresupuesto').value;
    let elPresupuesto = document.getElementById('txtPresupuesto');
    elPresupuesto.innerText = montoTxtPresupuesto;
}

var arregloNombresGastos = [];
var arregloNombresGastosEliminar = [];
var arregloCantidadGastos= [];
var arregloCantidadGastosEliminar = [];

function guardarGastos(){
    let gastosAcumulados = 0;
    
    for(let i=0; i<arregloCantidadGastos.length;i++){
        gastosAcumulados = gastosAcumulados + arregloCantidadGastos[i];
    }
    return gastosAcumulados;
}

function eliminarGasto(posicion){
    arregloNombresGastosEliminar =[];
    arregloCantidadGastosEliminar=[];
    arregloNombresGastos.splice(posicion,1);
    arregloCantidadGastos.splice(posicion,1);
    
    borrarGasto();

    for(let i=0; i<arregloNombresGastos.length;i++){
        arregloNombresGastosEliminar.push(arregloNombresGastos[i]);
        arregloCantidadGastosEliminar.push(arregloCantidadGastos[i]);
    }

    let montoPresupuesto = document.getElementById('txtPresupuesto').innerText;
    let montoGasto = document.getElementById('txtGasto');
    let montoSaldo = document.getElementById('txtSaldo');
    let sumaGastos = 0;
    
    for(let i=0 ; i<arregloCantidadGastos.length; i++){
        sumaGastos = sumaGastos + arregloCantidadGastos[i];
    }

    montoGasto.innerText = sumaGastos;

        let quedaSaldo = parseFloat(montoPresupuesto) - parseFloat(sumaGastos);
        montoSaldo.innerText = quedaSaldo;

    mostrarEliminar();
}

function borrarGasto(){
    let nombreGasto = document.getElementById('txtNombreGasto');
    let valorGasto = document.getElementById('txtCostoGasto');
    let accionBorrar = document.getElementById('boxBorrar');

    nombreGasto.innerText = '';
    valorGasto.innerText = '';
    accionBorrar.innerText = '';
}

function mostrarEliminar(){

    let nombreGasto = document.getElementById('txtNombreGasto');
    let valorGasto = document.getElementById('txtCostoGasto');
    let accionBorrar = document.getElementById('boxBorrar');

    let eliminar = arregloNombresGastosEliminar.length;
    
    for(let j=0; j<eliminar; j++){
        let txtNuevoGasto = document.createElement('p');
        let txtNuevoValorGasto = document.createElement('p');
        let txtBorrarNuevo = document.createElement('p');
        let nuevoBoton = document.createElement('i');

        txtNuevoGasto.innerText = arregloNombresGastosEliminar[j];
        txtNuevoValorGasto.innerText = arregloCantidadGastosEliminar[j];
        
        nuevoBoton.innerText = '';
        nuevoBoton.setAttribute('onclick', `eliminarGasto(${j})`);
        nuevoBoton.setAttribute('class', 'fa-solid fa-trash-can');
        
        nombreGasto.appendChild(txtNuevoGasto);
        valorGasto.appendChild(txtNuevoValorGasto);
        txtBorrarNuevo.appendChild(nuevoBoton);
        accionBorrar.appendChild(txtBorrarNuevo);
    }

}


function mostrarGastos(){
    let nombreGasto = document.getElementById('txtNombreGasto');
    let valorGasto = document.getElementById('txtCostoGasto');
    let accionBorrar = document.getElementById('boxBorrar');

    let txtNuevoGasto = document.createElement('p');
    let txtNuevoValorGasto = document.createElement('p');
    let txtBorrarNuevo = document.createElement('p');
    let nuevoBoton = document.createElement('i');

    for(let i=0; i<arregloNombresGastos.length; i++){
        txtNuevoGasto.innerText = arregloNombresGastos[i];
        txtNuevoValorGasto.innerText = arregloCantidadGastos[i];

        nuevoBoton.innerText = '';
        nuevoBoton.setAttribute('onclick', `eliminarGasto(${i})`);
        nuevoBoton.setAttribute('class', 'fa-solid fa-trash-can');
        
        nombreGasto.appendChild(txtNuevoGasto);
        valorGasto.appendChild(txtNuevoValorGasto);
        txtBorrarNuevo.appendChild(nuevoBoton);
        accionBorrar.appendChild(txtBorrarNuevo);
    }
}



function anadirGasto(){
    // variables para alojar los gastos
    let nombreGasto = document.getElementById('boxGasto').value;
    let montoGasto = document.getElementById('boxCantidadGasto').value;
    
    // almacenamos en los arreglos los gastos añadidos
    arregloNombresGastos.push(nombreGasto);
    arregloCantidadGastos.push(parseFloat(montoGasto));

    let sumaGastos =  guardarGastos(); 
        
    let montoPresupuesto = document.getElementById('txtPresupuesto').innerText;
    let textGasto = document.getElementById('txtGasto');
    let textSaldo = document.getElementById('txtSaldo');


    // enviamos el acumulado del gasto al parrafo gasto
    textGasto.innerText = sumaGastos;

    let valorSaldo = parseFloat(montoPresupuesto) - parseFloat(sumaGastos);
    textSaldo.innerText = valorSaldo;

    mostrarGastos();

}

function eventosApp(){
    let botonPresupuesto = document.getElementById('btnEnviar');
    botonPresupuesto.addEventListener('click', enviarPresupuesto);

    let botonGasto = document.getElementById('btnSumarGasto');
    botonGasto.addEventListener('click', anadirGasto);
}