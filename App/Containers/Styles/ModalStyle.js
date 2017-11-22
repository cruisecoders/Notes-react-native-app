import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles,Colors,Fonts } from '../../Themes/'

export default StyleSheet.create({
	mainContainer:{ 
		flex: 1, 
		flexDirection: 'column', 
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'#00000090' 
	},
	container:{
		height:300,
		width:300, 
		backgroundColor:'#fff',
		borderRadius:20 
	},
	header:{
		alignSelf:'center',
		height:50,
		justifyContent:'center'
	},
	headerText:{
		color:'blue',
		fontSize:20,
		fontWeight:'bold'
	}
})