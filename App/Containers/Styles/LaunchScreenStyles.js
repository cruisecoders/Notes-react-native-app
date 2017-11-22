import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles,Colors,Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  contentContainerStyle:{ 
    flexGrow : 1,
    justifyContent: 'center',
    alignSelf:'center',
    width:300 
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius:30,
    borderWidth:2,
    borderColor:'blue',
    height: 40,
    marginTop: 10,
    width: 300,
    justifyContent:'center',
  },
  buttonText:{
    textAlign:'center',
    color:'blue',
    fontSize:20,
    fontWeight:'200',
  },
  labelText:{
    fontSize:20,
    color:'blue'
  },
  input: {
    borderColor: 'blue',
    width: 300,
    borderRadius:30,
    paddingHorizontal:10
  },
  showNotesContainer:{
    alignSelf:'center',
    marginBottom:10 
  }
})
