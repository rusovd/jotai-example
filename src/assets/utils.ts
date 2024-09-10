export function createFunctionFromString(funcString: string): Function {
  const arrowIndex = funcString.indexOf('=>');

  if (arrowIndex === -1) {
    throw new Error('Wrong format! Should be like: (v) => ...');
  }

  const parameters = funcString.slice(0, arrowIndex).trim().replace(/^\(|\)$/g, '').trim();
  const body = funcString.slice(arrowIndex + 2).trim();

  // eslint-disable-next-line no-new-func
  return new Function(parameters, `return ${body}`);
}

export const extractTimeFromISOString = (isoString: string): string => {
  const match = isoString.match(/T(\d{2}:\d{2}:\d{2}(?:\.\d+)?)/);
  return match ? match[1] : '';
};
