const colors = {
  white: '#ffffff',
  black: '#000000',
  grey_0: '#d5d5d5',
  grey_1: '#a6a6a6',
  red: '#e84118',
  blue: '#609BDE',
  lightBlue: '#A4D1DF',
  pink: '#E8C5C4',
  opacity_white: 'rgba(255, 255, 255, 0.5)',
};

export const theme = {
  background: colors.opacity_white,
  gradientStart: colors.lightBlue,
  gradientEnd: colors.pink,
  text: colors.blue,
  imageBackground: colors.grey_0,
  label: colors.white,
  inputPlaceholder: colors.grey_1,
  inputBorder: colors.opacity_white,
  errorText: colors.red,
  buttonBackground: colors.blue,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.blue,
  headerTintColor: colors.white,
  headerBackground: colors.lightBlue,
  statusbar: colors.lightBlue,
};
