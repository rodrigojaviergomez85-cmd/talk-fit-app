export type PictionaryWord = {
  /** slug used for the asset filename */
  id: string;
  en: string;
  es: string;
  image: string;
};

export type PictionaryCategory = {
  id: string;
  en: string;
  es: string;
  words: PictionaryWord[];
};

const img = (category: string, id: string) =>
  new URL(`../../assets/pictionary/${category}/${id}.jpg`, import.meta.url).href;

const build = (
  category: string,
  rows: [id: string, en: string, es: string][],
): PictionaryWord[] => rows.map(([id, en, es]) => ({ id, en, es, image: img(category, id) }));

export const PICTIONARY_CATEGORIES: PictionaryCategory[] = [
  {
    id: "colors",
    en: "Colors",
    es: "Colores",
    words: build("colors", [
      ["red", "Red", "Rojo"],
      ["blue", "Blue", "Azul"],
      ["yellow", "Yellow", "Amarillo"],
      ["green", "Green", "Verde"],
      ["orange", "Orange", "Naranja"],
      ["purple", "Purple", "Morado"],
      ["pink", "Pink", "Rosado"],
      ["black", "Black", "Negro"],
      ["white", "White", "Blanco"],
      ["brown", "Brown", "Café"],
    ]),
  },
  {
    id: "numbers",
    en: "Numbers",
    es: "Números",
    words: build("numbers", [
      ["one", "One", "Uno"],
      ["two", "Two", "Dos"],
      ["three", "Three", "Tres"],
      ["four", "Four", "Cuatro"],
      ["five", "Five", "Cinco"],
      ["six", "Six", "Seis"],
      ["seven", "Seven", "Siete"],
      ["eight", "Eight", "Ocho"],
      ["nine", "Nine", "Nueve"],
      ["ten", "Ten", "Diez"],
    ]),
  },
  {
    id: "family",
    en: "Family",
    es: "Familia",
    words: build("family", [
      ["mother", "Mother", "Madre"],
      ["father", "Father", "Padre"],
      ["sister", "Sister", "Hermana"],
      ["brother", "Brother", "Hermano"],
      ["baby", "Baby", "Bebé"],
      ["grandmother", "Grandmother", "Abuela"],
      ["grandfather", "Grandfather", "Abuelo"],
      ["son", "Son", "Hijo"],
      ["daughter", "Daughter", "Hija"],
      ["family", "Family", "Familia"],
    ]),
  },
  {
    id: "food",
    en: "Food",
    es: "Comida",
    words: build("food", [
      ["bread", "Bread", "Pan"],
      ["rice", "Rice", "Arroz"],
      ["chicken", "Chicken", "Pollo"],
      ["egg", "Egg", "Huevo"],
      ["apple", "Apple", "Manzana"],
      ["milk", "Milk", "Leche"],
      ["water", "Water", "Agua"],
      ["coffee", "Coffee", "Café"],
      ["cheese", "Cheese", "Queso"],
      ["soup", "Soup", "Sopa"],
    ]),
  },
  {
    id: "animals",
    en: "Animals",
    es: "Animales",
    words: build("animals", [
      ["dog", "Dog", "Perro"],
      ["cat", "Cat", "Gato"],
      ["bird", "Bird", "Pájaro"],
      ["fish", "Fish", "Pez"],
      ["horse", "Horse", "Caballo"],
      ["cow", "Cow", "Vaca"],
      ["pig", "Pig", "Cerdo"],
      ["rabbit", "Rabbit", "Conejo"],
      ["lion", "Lion", "León"],
      ["elephant", "Elephant", "Elefante"],
    ]),
  },
  {
    id: "professions",
    en: "Professions",
    es: "Profesiones",
    words: build("professions", [
      ["teacher", "Teacher", "Maestro/a"],
      ["doctor", "Doctor", "Doctor/a"],
      ["nurse", "Nurse", "Enfermero/a"],
      ["police-officer", "Police officer", "Policía"],
      ["chef", "Chef", "Cocinero/a"],
      ["driver", "Driver", "Conductor/a"],
      ["engineer", "Engineer", "Ingeniero/a"],
      ["farmer", "Farmer", "Agricultor/a"],
      ["waiter", "Waiter", "Mesero/a"],
      ["mechanic", "Mechanic", "Mecánico/a"],
    ]),
  },
  {
    id: "clothes",
    en: "Clothes",
    es: "Ropa",
    words: build("clothes", [
      ["shirt", "Shirt", "Camisa"],
      ["pants", "Pants", "Pantalón"],
      ["dress", "Dress", "Vestido"],
      ["shoes", "Shoes", "Zapatos"],
      ["jacket", "Jacket", "Chaqueta"],
      ["hat", "Hat", "Sombrero"],
      ["socks", "Socks", "Calcetines"],
      ["skirt", "Skirt", "Falda"],
      ["coat", "Coat", "Abrigo"],
      ["belt", "Belt", "Cinturón"],
    ]),
  },
  {
    id: "house",
    en: "House",
    es: "Casa",
    words: build("house", [
      ["door", "Door", "Puerta"],
      ["window", "Window", "Ventana"],
      ["kitchen", "Kitchen", "Cocina"],
      ["bedroom", "Bedroom", "Dormitorio"],
      ["bathroom", "Bathroom", "Baño"],
      ["table", "Table", "Mesa"],
      ["chair", "Chair", "Silla"],
      ["bed", "Bed", "Cama"],
      ["sofa", "Sofa", "Sofá"],
      ["lamp", "Lamp", "Lámpara"],
    ]),
  },
  {
    id: "body",
    en: "Body",
    es: "Cuerpo",
    words: build("body", [
      ["head", "Head", "Cabeza"],
      ["hand", "Hand", "Mano"],
      ["foot", "Foot", "Pie"],
      ["eye", "Eye", "Ojo"],
      ["ear", "Ear", "Oreja"],
      ["nose", "Nose", "Nariz"],
      ["mouth", "Mouth", "Boca"],
      ["arm", "Arm", "Brazo"],
      ["leg", "Leg", "Pierna"],
      ["hair", "Hair", "Cabello"],
    ]),
  },
  {
    id: "objects",
    en: "Daily objects",
    es: "Objetos del día a día",
    words: build("objects", [
      ["phone", "Phone", "Teléfono"],
      ["computer", "Computer", "Computadora"],
      ["key", "Key", "Llave"],
      ["book", "Book", "Libro"],
      ["pen", "Pen", "Bolígrafo"],
      ["bag", "Bag", "Bolso"],
      ["watch", "Watch", "Reloj"],
      ["cup", "Cup", "Taza"],
      ["umbrella", "Umbrella", "Paraguas"],
      ["wallet", "Wallet", "Cartera"],
    ]),
  },
];
