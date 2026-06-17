export interface Action {
  title: string;
  description: string;
}

export interface ODS {
  number: number;
  title: string;
  color: string;
  textColor: string;
  description: string;
  longDescription: string;
  actions: Action[];
  unUrl: string;
}

export const ODS_CORDOBA: ODS[] = [
  {
    number: 3,
    title: "Salud y Bienestar",
    color: "#4C9F38",
    textColor: "#fff",
    description: "Garantizar una vida sana y promover el bienestar para todos en todas las edades.",
    longDescription: "La salud es mucho más que la ausencia de enfermedades. Implica el bienestar físico, mental y social de cada persona. En Córdoba, podemos trabajar juntos para crear entornos más saludables, promover hábitos de vida activos y garantizar el acceso a servicios de salud de calidad.",
    actions: [
      { title: "Aumentar las zonas verdes", description: "Vivir cerca de áreas verdes es genial, ya que las personas pueden hacer más ejercicio y sentirse mejor." },
      { title: "Gimnasios al aire libre", description: "Imagina un lugar donde puedas hacer ejercicio gratis al aire libre, ¡eso es genial para mantenernos activos!" },
      { title: "Campañas de prevención", description: "Aprendamos más sobre cómo prevenir enfermedades y evitar el consumo de drogas." },
      { title: "Cuidado integral de la salud", description: "La salud es más que ir al médico, también es entender cómo vivimos y conectarnos con otros servicios útiles." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/health/",
  },
  {
    number: 4,
    title: "Educación de Calidad",
    color: "#C5192D",
    textColor: "#fff",
    description: "Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje.",
    longDescription: "La educación es la base del desarrollo sostenible. En Córdoba, apostamos por una educación que prepare a los estudiantes para los desafíos del siglo XXI, fomente el pensamiento crítico y garantice que nadie quede atrás.",
    actions: [
      { title: "Ciudadanos digitales", description: "Vamos a aprender a usar la tecnología y nuestras emociones para adaptarnos mejor al mundo actual." },
      { title: "Educación inclusiva", description: "Todos debemos tener la oportunidad de aprender, sin importar nuestras diferencias." },
      { title: "Usar la tecnología", description: "Las nuevas tecnologías nos ayudan a aprender y enseñar de formas muy interesantes." },
      { title: "Valores y educación emocional", description: "Aprenderemos a ser tolerantes, respetuosos y comprender nuestras emociones." },
      { title: "Participar y apoyar", description: "Padres, madres y toda la comunidad debemos motivar y apoyar la educación de calidad." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/education/",
  },
  {
    number: 6,
    title: "Agua Limpia y Saneamiento",
    color: "#26BDE2",
    textColor: "#fff",
    description: "Garantizar la disponibilidad y la gestión sostenible del agua y el saneamiento para todos.",
    longDescription: "El agua es un recurso esencial y limitado. En Córdoba, su uso responsable es clave para garantizar el acceso al agua potable para las generaciones futuras y proteger nuestros ecosistemas acuáticos.",
    actions: [
      { title: "Agua, un recurso valioso", description: "El agua es importante y debemos usarla con responsabilidad, evitando desperdicios." },
      { title: "Limpiemos ríos y lagos", description: "Participemos en limpiezas para cuidar nuestros cuerpos de agua." },
      { title: "Cuidar el agua para mascotas", description: "Las mascotas también necesitan agua limpia, así que mantengamos sus recipientes limpios y llenos." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/water-and-sanitation/",
  },
  {
    number: 7,
    title: "Energía Asequible y No Contaminante",
    color: "#FCC30B",
    textColor: "#fff",
    description: "Garantizar el acceso a una energía asequible, segura, sostenible y moderna para todos.",
    longDescription: "La transición energética es uno de los desafíos más importantes de nuestro tiempo. En Córdoba, podemos contribuir adoptando hábitos de consumo responsable y apoyando el desarrollo de energías limpias y renovables.",
    actions: [
      { title: "Cuidemos la energía", description: "Apaguemos los aparatos que no usamos y usemos bombillas de bajo consumo." },
      { title: "Energías renovables", description: "Podemos usar el sol, el viento o el agua para obtener energía limpia y respetuosa con el ambiente." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/energy/",
  },
  {
    number: 11,
    title: "Ciudades y Comunidades Sostenibles",
    color: "#FD9D24",
    textColor: "#fff",
    description: "Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, resilientes y sostenibles.",
    longDescription: "Córdoba tiene el potencial de ser una ciudad modelo en sostenibilidad. Con pequeñas acciones cotidianas podemos contribuir a reducir nuestra huella ambiental, mejorar la movilidad y hacer de nuestra ciudad un lugar más habitable para todos.",
    actions: [
      { title: "Cuidemos el planeta", description: "Podemos reducir la contaminación usando menos el auto, apagando luces innecesarias y reciclando." },
      { title: "Espacios verdes para todos", description: "Las mascotas también merecen disfrutar de zonas verdes, pero recordemos cuidarlas y recoger sus heces." },
      { title: "Hogares seguros para mascotas", description: "Protejamos a nuestras mascotas con cerramientos y ambientes adaptados para su bienestar." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/cities/",
  },
  {
    number: 12,
    title: "Producción y Consumo Responsables",
    color: "#BF8B2E",
    textColor: "#fff",
    description: "Garantizar modalidades de consumo y producción sostenibles.",
    longDescription: "Nuestros hábitos de consumo tienen un impacto directo en el planeta. En Córdoba, podemos elegir opciones más sostenibles, reducir el desperdicio y apoyar una economía circular que cuide los recursos naturales.",
    actions: [
      { title: "Compras conscientes", description: "Elijamos productos sostenibles y ecológicos que respeten el medio ambiente." },
      { title: "No desperdiciar alimentos", description: "Planeemos nuestras compras y aprovechemos bien los alimentos para evitar desperdicios." },
      { title: "Reciclar y reutilizar", description: "Apoyemos la economía circular, dando nueva vida a objetos en lugar de desecharlos." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/sustainable-consumption-production/",
  },
  {
    number: 15,
    title: "Vida de Ecosistemas Terrestres",
    color: "#56C02B",
    textColor: "#fff",
    description: "Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres.",
    longDescription: "La biodiversidad de Córdoba es un patrimonio invaluable que debemos proteger. Desde el bosque nativo serrano hasta los parques urbanos, cada espacio natural merece nuestra atención y cuidado.",
    actions: [
      { title: "Convivamos en armonía", description: "Compartimos el hábitat con las mascotas, así que seamos responsables y cuidemos la naturaleza." },
      { title: "No a la caza ilegal", description: "No permitamos que se capturen animales silvestres para venderlos, respetemos la biodiversidad." },
      { title: "Reportar situaciones", description: "Si vemos acciones que afectan a la naturaleza o animales silvestres, denunciemos de manera anónima." },
    ],
    unUrl: "https://www.un.org/sustainabledevelopment/es/biodiversity/",
  },
];

export const ALL_ODS: { number: number; title: string; color: string; unUrl: string }[] = [
  { number: 1,  title: "Fin de la Pobreza",                        color: "#E5243B", unUrl: "https://www.un.org/sustainabledevelopment/es/poverty/"                         },
  { number: 2,  title: "Hambre Cero",                              color: "#DDA63A", unUrl: "https://www.un.org/sustainabledevelopment/es/hunger/"                          },
  { number: 3,  title: "Salud y Bienestar",                        color: "#4C9F38", unUrl: "https://www.un.org/sustainabledevelopment/es/health/"                          },
  { number: 4,  title: "Educación de Calidad",                    color: "#C5192D", unUrl: "https://www.un.org/sustainabledevelopment/es/education/"                       },
  { number: 5,  title: "Igualdad de Género",                      color: "#FF3A21", unUrl: "https://www.un.org/sustainabledevelopment/es/gender-equality/"                 },
  { number: 6,  title: "Agua Limpia y Saneamiento",               color: "#26BDE2", unUrl: "https://www.un.org/sustainabledevelopment/es/water-and-sanitation/"             },
  { number: 7,  title: "Energía Asequible",                       color: "#FCC30B", unUrl: "https://www.un.org/sustainabledevelopment/es/energy/"                          },
  { number: 8,  title: "Trabajo Decente",                         color: "#A21942", unUrl: "https://www.un.org/sustainabledevelopment/es/economic-growth/"                 },
  { number: 9,  title: "Industria e Innovación",                  color: "#FD6925", unUrl: "https://www.un.org/sustainabledevelopment/es/infrastructure/"                  },
  { number: 10, title: "Reducción de Desigualdades",              color: "#DD1367", unUrl: "https://www.un.org/sustainabledevelopment/es/inequality/"                      },
  { number: 11, title: "Ciudades Sostenibles",                    color: "#FD9D24", unUrl: "https://www.un.org/sustainabledevelopment/es/cities/"                          },
  { number: 12, title: "Consumo Responsable",                     color: "#BF8B2E", unUrl: "https://www.un.org/sustainabledevelopment/es/sustainable-consumption-production/" },
  { number: 13, title: "Acción por el Clima",                     color: "#3F7E44", unUrl: "https://www.un.org/sustainabledevelopment/es/climate-change-2/"                },
  { number: 14, title: "Vida Submarina",                          color: "#0A97D9", unUrl: "https://www.un.org/sustainabledevelopment/es/oceans/"                          },
  { number: 15, title: "Ecosistemas Terrestres",                  color: "#56C02B", unUrl: "https://www.un.org/sustainabledevelopment/es/biodiversity/"                    },
  { number: 16, title: "Paz y Justicia",                          color: "#00689D", unUrl: "https://www.un.org/sustainabledevelopment/es/peace-justice/"                   },
  { number: 17, title: "Alianzas Globales",                       color: "#19486A", unUrl: "https://www.un.org/sustainabledevelopment/es/globalpartnerships/"              },
];
