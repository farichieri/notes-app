export const noteDto = (note) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, ...data } = note;

  return data;
};
