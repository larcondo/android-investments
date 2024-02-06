export const fechaToString = ( f ) => {
  const values = f.split('-');
  const meses = {
    mes01: 'ene',
    mes02: 'feb',
    mes03: 'mar',
    mes04: 'abr',
    mes05: 'may',
    mes06: 'jun',
    mes07: 'jul',
    mes08: 'ago',
    mes09: 'sep',
    mes10: 'oct',
    mes11: 'nov',
    mes12: 'dic',
  };

  return `${values[2]} ${meses['mes' + values[1]]} ${values[0]}`;
};

export const currency = ( val ) => {
  return '$ ' + val.toLocaleString('es-ES');
};