import Dimensions from 'Dimensions'


export const colors = {
  black: '#000',
  error: '#FF0700',
  gray: 'rgba(255, 255, 255, 0.4)',
  success: '#0CF500',
  white: '#FFFFFF',

  primary: '#356859',
  primary1: '#37966F',
  primary2: '#B9E4C9',

  secondary: '#FD5523',
  secondary1: '#FFFBE6'
}

export const dimensionsDevice = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
}

export const roundButton = {
  alignItems: 'center',
  borderRadius: 20,
  alignSelf: 'center',
  justifyContent: 'center',
  zIndex: 100,
}
