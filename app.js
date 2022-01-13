let egreso1 = {}
let ingreso1 = {}
const todosLosIngresos = []
const todosLosEgresos = []
let mayorIngreso = []
let fechaMayorIngreso = 0
let ingresoTotal = 0
let totalGasto = 0
let totalMes = 0
let formmov = ''
let myChart
let contenedori
let contenedore
let contenedorTotal
let contenedorMayorIng


// declaracion de objetos

function ingreso(fecha, importe) {
    this.fecha = fecha;
    this.importe = importe;

}

function egreso(fecha, importe) {
    this.fecha = fecha;
    this.importe = importe;
    
}

//Mostras Formulario de ingreso de datos segun la opcion marcada

function mostrarFormulario (){

    const form= document.getElementById("datos")

    form.addEventListener('submit', (event) => {
        
        event.preventDefault()
        
        contenedori = document.getElementsByClassName('i')[0]
        contenedore = document.getElementsByClassName('e')[0]

        formmov = document.querySelector('input[name="tipo"]:checked').value
                    
        if (formmov === 'ing'){
            contenedori.classList.toggle('i')
        }else if(formmov === 'egr'){
            contenedore.classList.toggle('e')
        } 

        form.reset()
        
    })

}

// carga de movimientos

function movimientos (){

    const movi = document.getElementById('ingreso')

    movi.addEventListener('submit' , (event) => {
        
        event.preventDefault()
        
        todosLosIngresos.length = 0
        
        let fec = Fechaing.value
        let imp = parseInt(importesi.value)
        
        const ingreso1 = new ingreso (fec, imp)
        
        todosLosIngresos.push(ingreso1)
              
        reportesi()
        datosi()
        grafico(ingresoTotal, totalGasto)
        
        movi.reset()
             
        contenedori.classList.toggle('i')
           
    })
    
    const move = document.getElementById('egreso')
    
    move.addEventListener('submit' , (event) => {
        
        event.preventDefault()

        todosLosEgresos.length = 0
        
        let fec = Fechaeg.value
        let imp = parseInt(importese.value)
        
        const egreso1 = new egreso (fec, imp)
        
        todosLosEgresos.push(egreso1)
        
        reportese()
        datose()
        grafico(ingresoTotal, totalGasto)

        move.reset()

        contenedore.classList.toggle('e')

    })
}


// Reportes

function reportesi () {
    
    mayorIngreso= Math.max.apply(Math, todosLosIngresos.map( function(o){ return o.importe}))

    const contenedorMayorIng = document.getElementById('movm').innerHTML = ` 
    Importe:  $${mayorIngreso}
    <br>
    `
    todosLosIngresos.forEach( (i) => {
        ingresoTotal += i.importe
    })
    
    totalMes = ingresoTotal - totalGasto
        
    const contenedorTotal = document.getElementById('mov').innerHTML = ` 
    Importe:  $ ${totalMes}
    <br>
    `

}

function reportese(){

    for( let e of todosLosEgresos){
        totalGasto += e.importe
    }

    totalMes = ingresoTotal - totalGasto
           
    const contenedorTotal = document.getElementById('mov').innerHTML = ` 
    Importe:  $ ${totalMes}
    <br>
    `
   
}

// Mostrar movimientos por DOM

function datosi(){

    const contenedorMovIng = document.getElementById('moving')
    
    todosLosIngresos.forEach((mov) => {
                    
        const movi = document.createElement('movi')
        
        movi.innerHTML = ` 
        Fecha: ${mov.fecha} - Importe:  $ ${mov.importe}
        <br>
        `
        contenedorMovIng.append(movi)
    
    })
}

function datose(){        
   
    const contenedorMovEgr = document.getElementById('movegr')
        
    todosLosEgresos.forEach((movimientos) => {
        
        const move = document.createElement('move')
        
        move.innerHTML = ` 
        Fecha: ${movimientos.fecha} - Importe:  $ ${movimientos.importe}
        <br>
        `
        contenedorMovEgr.append(move)
        
    })
        
}

//grafico

function grafico(ingresoTotal, totalGasto){

    if (myChart) {
    myChart.destroy();
    }

    const ch = document.getElementById('chart')
    myChart = new Chart(ch, {
        type: 'doughnut',
        data: {labels: [
            'Ingresos',
            'Gastos'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [ingresoTotal, totalGasto],
            backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]},
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    })
    
    
}

mostrarFormulario()
movimientos()
