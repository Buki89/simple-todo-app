export const getColor = (error: string | undefined, empty: boolean): string => {
  if (error !== undefined) {
    return "#f00;";
  } else if (!empty) {
    return "#03a9f4;";
  } else {
    return "#00000095;";
  }
};
