/* eslint-disable no-prototype-builtins */

const paint = {
  // default colors
  clr: '#212121',
  bgc: '#b0bec5',
};

const colors = {
  error: { clr: '#ffebee', bgc: '#c62828' }, // red
  success: { clr: '#e8f5e9', bgc: '#2e7d32' }, // green
  warning: { clr: '#fff3e0', bgc: '#f4511e' }, // orange
  info: { clr: '#ede7f6', bgc: '#651fff' }, // purple
  debug: { clr: '#e3f2fd', bgc: '#0e756a' }, // green blue
};

export function log(message: string, level: keyof typeof colors) {
  // overriting default colors if color given
  if (colors.hasOwnProperty(level)) {
    paint.clr = colors[level].clr;
    paint.bgc = colors[level].bgc;
  }

  const css = `color ${paint.clr}; background-color: ${paint.bgc}; padding: 2px 4px; border-radius: 3px;`;

  console.log('%c' + message, css);
}

export const logger = {
  error: (message: string) => log(message, 'error'),
  success: (message: string) => log(message, 'success'),
  warning: (message: string) => log(message, 'warning'),
  info: (message: string) => log(message, 'info'),
  debug: (message: string) => log(message, 'debug'),
};
