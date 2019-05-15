import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bg: {
    width: 243,
    height: 148
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: -1,
    paddingHorizontal: 30,
    width: 265,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  seperate: {
    marginVertical: 18,
    width: 17,
    height: 3,
    backgroundColor: '#f08300',
    borderRadius: 3
  },
  title: {
    fontSize: 21,
    color: '#121212',
    fontWeight: '900'
  },
  version: {
    marginTop: 15,
    fontSize: 14,
    color: '#f08300',
    fontWeight: '900'
  },
  inner: {
    marginTop: 20,
    marginBottom: 10,
    maxHeight: 80,
    width: '100%'
  },
  txt: {
    marginBottom: 3,
    color: '#999',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center'
  },
  btn: {
    marginVertical: 20,
    width: 170,
    height: 40,
    backgroundColor: '#f08300',
    borderRadius: 20
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900'
  },
  close: {
    position: 'absolute',
    top: 64,
    right: 50
  },
  closeInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 30
  },
  closeIcon: {
    width: 10,
    height: 10
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#c0c0c0'
  }
});

export default styles;
