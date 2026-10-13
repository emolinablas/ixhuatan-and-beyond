export interface EmergencyContact {
  label: string;
  labelEn: string;
  number: string;
  tel: string;
  country: 'GT' | 'SV' | 'US';
  note: string;
  noteEn: string;
}

// Embassy numbers: State Dept listings disagree for Guatemala; 2354-0000 is the
// one in the 2025 security alerts (new Zona 16 compound). Re-check before the trip.
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { label: 'Asistencia al Turista (PROATUR / INGUAT)', labelEn: 'Tourist Assistance (PROATUR / INGUAT)', number: '1500', tel: '1500', country: 'GT', note: '24/7 en español e inglés', noteEn: '24/7 in English & Spanish' },
  { label: 'PROATUR desde teléfono de EE.UU.', labelEn: 'PROATUR from a US phone', number: '+502 2290-2810', tel: '+50222902810', country: 'GT', note: 'El 1500 solo funciona con línea guatemalteca', noteEn: '1500 only works from a Guatemalan line' },
  { label: 'Policía Nacional Civil', labelEn: 'National Police', number: '110', tel: '110', country: 'GT', note: 'Seguridad y tránsito', noteEn: 'Security & traffic' },
  { label: 'Bomberos Voluntarios (ambulancia)', labelEn: 'Volunteer Firefighters (ambulance)', number: '122', tel: '122', country: 'GT', note: 'Emergencias médicas', noteEn: 'Medical emergencies' },
  { label: 'Emergencias El Salvador', labelEn: 'El Salvador emergencies', number: '911', tel: '911', country: 'SV', note: 'Solo si el viaje de Thanksgiving es a El Salvador', noteEn: 'Only if Thanksgiving is in El Salvador' },
  { label: 'Embajada de EE.UU. en Guatemala', labelEn: 'US Embassy Guatemala', number: '+502 2354-0000', tel: '+50223540000', country: 'US', note: 'Confirmar en gt.usembassy.gov', noteEn: 'Confirm at gt.usembassy.gov' },
  { label: 'Embajada de EE.UU. en El Salvador (emergencias)', labelEn: 'US Embassy El Salvador (after hours)', number: '+503 2501-2999', tel: '+50325012999', country: 'US', note: 'Fuera de horario', noteEn: 'After-hours line' },
];
