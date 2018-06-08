const internalVariables = {
  blue: '#2897ff',
  white: '#fff',
  violet: '#a050ff',
  red: '#ff323d',
  black: '#000',
  grey: '#4a4a4a',
  yellow: '#ffc800',
  darkGrey: '#323232',
  lightGrey: '#d8d8d8',
  green: '#5ac328',
  pink: '#ff6ecf',

  borderRadius: '8px',

  fontMain: 'Poppins',
  fontMainBold: 'Poppins Bold'
};

const GlobalStyles = {
  // Global dimentions
  dimentions: {
    borderRadius: internalVariables.borderRadius
  },
  
  // Global colours 
  colours: {
    blue: internalVariables.blue,
    white: internalVariables.white,
    violet: internalVariables.violet,
    red: internalVariables.red,
    black: internalVariables.black,
    grey: internalVariables.grey,
    yellow: internalVariables.yellow,
    darkGrey: internalVariables.darkGrey,
    lightGrey: internalVariables.lightGrey,
    green: internalVariables.green,
    pink: internalVariables.pink
  },

  // Global fonts
  fonts: {
    fontMain: internalVariables.fontMain,
    fontMainBold: internalVariables.fontMainBold
  },

  sharedComponentStyles: {
    button: {
      marginTop: '0.5em',
      padding: '0.6em 0.9em',
      fontSize: '1.2em',
      border: 'none',
      color: internalVariables.white,
      backgroundColor: internalVariables.blue,
      borderRadius: internalVariables.borderRadius
    },

    flexEnd: {
      display: 'flex',
      justifyContent: 'flex-end'
    },

    input: {
      width: '100%',
      padding: '0.5em',
      border: '1px black solid',
      borderRadius: '5px',
      margin: '5px 0',
      fontSize: '1.2em'
    }
  }
};

export default GlobalStyles;