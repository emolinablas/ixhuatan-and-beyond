// Real photos of each place from Wikimedia Commons (free licenses; credit shown
// in the app). The earlier stock photos showed Dubai, the Alps and Yosemite.
// Places with no free photo (Los Amates, Santa Teresa) get an illustrated card instead.

export interface Photo {
  url: string; // ~960px wide
  credit: string;
}

export const PHOTOS = {
  ixhuatan: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Santa_Mar%C3%ADa_Ixhuat%C3%A1n%2C_Santa_rosa_.jpg/960px-Santa_Mar%C3%ADa_Ixhuat%C3%A1n%2C_Santa_rosa_.jpg', credit: 'Ministerio de Comunicaciones CIV · CC BY-SA 4.0' },
  aeropuerto: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/La_Aurora_International_Airport.jpg/960px-La_Aurora_International_Airport.jpg', credit: 'Tristanh · Dominio público' },
  monterrico: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Monterrico_in_1998.jpg/960px-Monterrico_in_1998.jpg', credit: 'Leonora (Ellie) Enking · CC BY-SA 2.0' },
  ataco: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Concepci%C3%B3n_de_Ataco%2C_El_Salvador_%282011%29_-_panoramio.jpg/960px-Concepci%C3%B3n_de_Ataco%2C_El_Salvador_%282011%29_-_panoramio.jpg', credit: 'Martin Haeusler · CC BY-SA 3.0' },
  juayua: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Iglesia_de_Santa_Luc%C3%ADa%2C_Juay%C3%BAa..jpg/960px-Iglesia_de_Santa_Luc%C3%ADa%2C_Juay%C3%BAa..jpg', credit: 'Photoprojectsv · CC BY-SA 4.0' },
  coatepeque: { url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Teopan.jpg', credit: 'Dominio público' },
  chiquimula: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Chiquimula_-_Guatemala_7.jpg/960px-Chiquimula_-_Guatemala_7.jpg', credit: 'Gobierno de Guatemala · Dominio público' },
  rioDulce: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Puente_de_Rio_Dulce_Guatemala.jpg/960px-Puente_de_Rio_Dulce_Guatemala.jpg', credit: 'Chapinlandia999 · CC BY-SA 4.0' },
  castilloSanFelipe: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Castillo_de_San_Felipe_de_Lara_in_Guatemala_04.jpg/960px-Castillo_de_San_Felipe_de_Lara_in_Guatemala_04.jpg', credit: 'Gusjer · CC BY 2.0' },
  livingston: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Harbour_of_Livingston_Guatemala.jpg/960px-Harbour_of_Livingston_Guatemala.jpg', credit: 'Padraic · CC BY-SA 2.0' },
  golfete: { url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Laguna_en_golfo_dulce.JPG', credit: 'Jjaz · CC BY-SA 3.0' },
  antigua: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Brooding_-_Arco_de_Santa_Catalina%2C_Antigua_Guatemala_2022.jpg/960px-Brooding_-_Arco_de_Santa_Catalina%2C_Antigua_Guatemala_2022.jpg', credit: 'Not So Dusty · CC BY 2.0' },
  atitlan: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Atitlan_Lake.jpg/960px-Atitlan_Lake.jpg', credit: 'Emilio Piovesan · CC BY 3.0' },
  sanJuan: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Main_street%2C_San_Juan_la_Laguna_Guatemala.jpg/960px-Main_street%2C_San_Juan_la_Laguna_Guatemala.jpg', credit: 'young shanahan · CC BY 2.0' },
  godinez: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Atardecer_San_Antonio_Palop%C3%B3.jpg/960px-Atardecer_San_Antonio_Palop%C3%B3.jpg', credit: 'Nahual de la sociedad · CC BY 4.0' },
  semuc: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Semuc_Champey%2C_Guatemala.jpg/960px-Semuc_Champey%2C_Guatemala.jpg', credit: 'Christopher Crouzet · CC BY-SA 3.0' },
  lanquin: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_Lanqu%C3%ADn%2C_Guatemala.jpg/960px-View_of_Lanqu%C3%ADn%2C_Guatemala.jpg', credit: 'Salix Oculus · CC BY-SA 4.0' },
  coban: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/CatedralCoban2015_01.JPG/960px-CatedralCoban2015_01.JPG', credit: 'Nerdoguate · CC BY-SA 4.0' },
  biotopo: { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Quetzal_at_Biotopo_del_Quetzal_in_Baja_Verapaz%2C_Guatemala.jpg/960px-Quetzal_at_Biotopo_del_Quetzal_in_Baja_Verapaz%2C_Guatemala.jpg', credit: 'quapan · CC BY 2.0' },
} satisfies Record<string, Photo>;

/** Smaller Commons thumbnail for map pins and list rows. */
export const photoThumb = (photo: Photo, width: 330 | 500 = 330) =>
  photo.url.replace('/960px-', `/${width}px-`);
