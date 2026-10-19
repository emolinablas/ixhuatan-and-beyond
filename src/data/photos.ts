// Real photos of each place from Wikimedia Commons (free licenses; credit shown
// in the app). The earlier stock photos showed Dubai, the Alps and Yosemite.
// Places with no free photo (Los Amates, Andá Mirá, Paragliding Chiquimula) get an illustrated card instead.

export interface Photo {
  url: string; // ~960px wide
  credit: string;
}

export const PHOTOS = {
  pupusas: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Pupusas_food.jpg/960px-Pupusas_food.jpg', credit: 'Priyapadayachee · CC BY-SA 4.0' },
  ixhuatan: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Santa_Mar%C3%ADa_Ixhuat%C3%A1n%2C_Santa_rosa_.jpg/960px-Santa_Mar%C3%ADa_Ixhuat%C3%A1n%2C_Santa_rosa_.jpg', credit: 'Ministerio de Comunicaciones CIV · CC BY-SA 4.0' },
  aeropuerto: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/La_Aurora_International_Airport.jpg/960px-La_Aurora_International_Airport.jpg', credit: 'Tristanh · Dominio público' },
  monterrico: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Monterrico_in_1998.jpg/960px-Monterrico_in_1998.jpg', credit: 'Leonora (Ellie) Enking · CC BY-SA 2.0' },
  coatepeque: { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Teopan.jpg', credit: 'Dominio público' },
  chiquimula: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Chiquimula_-_Guatemala_7.jpg/960px-Chiquimula_-_Guatemala_7.jpg', credit: 'Gobierno de Guatemala · Dominio público' },
  rioDulce: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Puente_de_Rio_Dulce_Guatemala.jpg/960px-Puente_de_Rio_Dulce_Guatemala.jpg', credit: 'Chapinlandia999 · CC BY-SA 4.0' },
  castilloSanFelipe: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Castillo_de_San_Felipe_de_Lara_in_Guatemala_04.jpg/960px-Castillo_de_San_Felipe_de_Lara_in_Guatemala_04.jpg', credit: 'Gusjer · CC BY 2.0' },
  livingston: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Harbour_of_Livingston_Guatemala.jpg/960px-Harbour_of_Livingston_Guatemala.jpg', credit: 'Padraic · CC BY-SA 2.0' },
  antigua: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Brooding_-_Arco_de_Santa_Catalina%2C_Antigua_Guatemala_2022.jpg/960px-Brooding_-_Arco_de_Santa_Catalina%2C_Antigua_Guatemala_2022.jpg', credit: 'Not So Dusty · CC BY 2.0' },
  atitlan: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Atitlan_Lake.jpg/960px-Atitlan_Lake.jpg', credit: 'Emilio Piovesan · CC BY 3.0' },
  sanJuan: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Main_street%2C_San_Juan_la_Laguna_Guatemala.jpg/960px-Main_street%2C_San_Juan_la_Laguna_Guatemala.jpg', credit: 'young shanahan · CC BY 2.0' },
  godinez: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Atardecer_San_Antonio_Palop%C3%B3.jpg/960px-Atardecer_San_Antonio_Palop%C3%B3.jpg', credit: 'Nahual de la sociedad · CC BY 4.0' },
} satisfies Record<string, Photo>;

/** Smaller Commons thumbnail for map pins and list rows. */
export const photoThumb = (photo: Photo, width: 330 | 500 = 330) =>
  photo.url.replace('/960px-', `/${width}px-`);
