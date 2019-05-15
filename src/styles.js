import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

// style里面的尺寸大小都写与2倍图设计稿一样(以宽度750px为基础)，eg:设计稿为20px,style里面写20rem
// const entireScreenWidth = Dimensions.get('window').width;
// EStyleSheet.build({ $rem: entireScreenWidth / 750 });

const styles = EStyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bg: {
    width: '487rem',
    height: '297rem'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '-2rem',
    paddingHorizontal: '60rem',
    width: '530rem',
    backgroundColor: '#fff',
    borderRadius: '20rem'
  },
  seperate: {
    marginVertical: '36rem',
    width: '34rem',
    height: '6rem',
    backgroundColor: '#f08300',
    borderRadius: '6rem'
  },
  title: {
    fontSize: '42rem',
    color: '#121212',
    fontWeight: '900'
  },
  version: {
    marginTop: '30rem',
    fontSize: '27rem',
    color: '#f08300',
    fontWeight: '900'
  },
  inner: {
    marginTop: '40rem',
    marginBottom: '20rem',
    maxHeight: '160rem',
    width: '100%'
  },
  txt: {
    marginBottom: '6rem',
    color: '#999',
    fontSize: '27rem',
    lineHeight: '30rem',
    textAlign: 'center'
  },
  btn: {
    marginVertical: '40rem',
    width: '340rem',
    height: '80rem',
    backgroundColor: '#f08300',
    borderRadius: '40rem'
  },
  btnTxt: {
    fontSize: '32rem',
    lineHeight: '80rem',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900'
  },
  close: {
    position: 'absolute',
    top: '130rem',
    right: '100rem'
  },
  closeInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70rem',
    height: '60rem'
  },
  closeIcon: {
    width: '21rem',
    height: '21rem'
  },
  divider: {
    width: '100%',
    height: '1rem',
    backgroundColor: '#c0c0c0'
  }
});

export default styles;
