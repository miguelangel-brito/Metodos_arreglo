const propiedadesJSON = [
  {
    name: 'Casa de campo',
    description: 'Un lugar ideal para descansar de la ciudad',
    src: 'https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg',
    rooms: 2,
    m: 170,
  },
  {
    name: 'Casa de playa',
    description: 'Despierta tus días oyendo el oceano',
    src: 'https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg',
    rooms: 2,
    m: 130,
  },
  {
    name: 'Casa en el centro',
    description: 'Ten cerca de ti todo lo que necesitas',
    src: 'https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg',
    rooms: 1,
    m: 80,
  },
  {
    name: 'Casa rodante',
    description: 'Conviertete en un nómada del mundo sin salir de tu casa',
    src: 'https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg',
    rooms: 1,
    m: 6,
  },
  {
    name: 'Departamento',
    description: 'Desde las alturas todo se ve mejor',
    src: 'https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg',
    rooms: 3,
    m: 200,
  },
  {
    name: 'Mansión',
    description: 'Vive una vida lujosa en la mansión de tus sueños ',
    src: 'https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg',
    rooms: 5,
    m: 500,
  },
]

const inputCuarto = document.querySelector('#inputCuarto')
const inputFrom = document.querySelector('#inputFrom')
const inputTo = document.querySelector('#inputTo')
const btnBuscar = document.querySelector('#btnBuscar')
const propiedades = document.querySelector('#propiedades')
const totalpropiedades = document.querySelector('#totalpropiedades')

const filterCuartos = json => {
  const filterPerRoom = json.map(mov => {
    if (+inputCuarto.value === mov.rooms) {
      return mov
    }
  })

  return filterPerRoom
}

const filterMetros = json => {
  const rangeMeter = json.map(mov => mov.m)
  const min = rangeMeter.reduce((a, b) => Math.min(a, b))
  const max = rangeMeter.reduce((a, b) => Math.max(a, b))

  const filterNum = json.map(mov => {
    const minNumberCondition =
      +inputFrom.value >= min && +inputFrom.value <= max
        ? +inputFrom.value : false

    const maxNumberCondition =
      +inputTo.value >= min && +inputTo.value <= max ?
        +inputTo.value : false

    if (maxNumberCondition >= mov.m && minNumberCondition <= mov.m) {
      return mov
    }
  })

  return filterNum
}

const filterUndefined = (rooms, meters) => {
  const filterUndefinedRooms = rooms.filter(mov =>
    mov !== undefined ? mov : false
  )

  const filterUndefinedMeters = meters.filter(mov =>
    mov !== undefined ? mov : false
  )

  const propiedadesArr = [...filterUndefinedRooms, ...filterUndefinedMeters]

  const deleteRepeated = propiedadesArr.filter(
    (mov, index) => propiedadesArr.indexOf(mov) === index
  )

  return deleteRepeated
}

btnBuscar.addEventListener('click', () => {
  propiedades.innerHTML = ''

  if (+inputCuarto.value <= 0) {
    return (totalpropiedades.textContent =
      'Intenta cambiendo el cuartos')
  }

  if (+inputFrom.value <= 0 || +inputTo.value <= 0) {
    return (totalpropiedades.textContent =
      'Cambia los valores de metros cuadrado.')
  }

  const finalObjectpropiedades = filterUndefined(
    filterCuartos(propiedadesJSON),
    filterMetros(propiedadesJSON)
  )

  const finalArrpropiedades = []

  for (const i of finalObjectpropiedades) {
    if (+inputCuarto.value === i.rooms) {
      finalArrpropiedades.push(i)
    }

    if (+inputCuarto.value === i.rooms) {
      totalpropiedades.textContent = `Total: ${finalArrpropiedades.length}`

      propiedades.innerHTML += `
           <div class="propiedad">
             <div
               class="img"
               style="
                 background-image: url('${i.src}');
               "
             ></div>
             <section>
               <h5>${i.name}</h5>
               <div class="d-flex justify-content-between">
                 <p>Cuartos: ${i.rooms}</p>
                 <p>Metros: ${i.m}</p>
               </div>
               <p class="my-3">Mansión gigante</p>
               <button class="btn btn-info">Ver más</button>
             </section>
           </div>
  `
    }

    if (finalArrpropiedades.length === 0) {
      totalpropiedades.textContent =
        'No disponemos propiedades con estas características'
    }
  }
})