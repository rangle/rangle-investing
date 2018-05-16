export default () => {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, char => {
    /* tslint:disable:no-bitwise */
    const random = Math.random() * 16 | 0;
    return (char === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    /* tslint:enable:no-bitwise */
  });
};
