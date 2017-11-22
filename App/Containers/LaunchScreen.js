import React, { Component } from 'react'
import { 
  ScrollView, 
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation,
  NativeModules,
  AsyncStorage,
  ToastAndroid 
} from 'react-native'
import { Field,reduxForm } from 'redux-form';
/*
  For layout Animation in android

*/
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

//Local Imports
import { Colors,Metrics } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class CreateNotes extends Component {
  static navigationOptions = ({ navigation }) => {
		return{
			title:'Notes',
			headerStyle:{
				elevation:0,
				height:60
			},
			headerTitleStyle:{
				alignSelf:'center', 
				textAlign:'center'               
			},
      headerRight: (<View></View>),
      headerLeft:(<View />)
		}
	}
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}
  
  constructor(props){
    super(props);
    this.state = {
      error: false,
      visibleHeight: Metrics.screenHeight,
      notesList:[]
    }
    this._renderInput = this._renderInput.bind(this);
    this._submit = this._submit.bind(this);
    this._preFetchNotesList = this._preFetchNotesList.bind(this);
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight
    })
  }

  _renderInput = ({ input: { onChange, ...restInput }}) => {
    return (
      <TextInput 
        underlineColorAndroid='blue'
        multiline
        autoGrow
        maxHeight={70}
        numberOfLines={3}
        style={styles.input} 
        onChangeText={onChange} 
        {...restInput} 
      />
    )
  }

  async _submit(values){
    const {notesList} = this.state;
    notesList.push(values);
    console.log(notesList);
    let key = '@App:Notes'
    try{
      await AsyncStorage.setItem(key,JSON.stringify(notesList))
      this.setState({ 
        error:false,
      });
      ToastAndroid.showWithGravityAndOffset('Note Created Successfully', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } catch (error){
      console.log(error);
      this.setState({
        error:true,
      });
      ToastAndroid.showWithGravityAndOffset('Error creating Notes', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }
    this.props.reset();
  }

  goToNotesList = () => {
    const { navigate } = this.props.navigation;
    navigate('NotesListScreen');
  }

  async _preFetchNotesList () { 
    let key = '@App:Notes'
    let response = await AsyncStorage.getItem(key); 
    let notesList = await JSON.parse(response) || []; 
    console.log(notesList);
    this.setState({ 
      notesList
    }); 
  } 
  
  componentDidMount(){
    this._preFetchNotesList();
  }

  render () {
    const { visibleHeight } = this.state;
    const screenSize =  (visibleHeight === Metrics.screenHeight);
    const { handleSubmit,pristine,submitting } = this.props;
    return (
      <View style={{ flex:1 }}>
        <ScrollView 
          contentContainerStyle={ styles.contentContainerStyle }   
          centerContent
          style={[ styles.container,{ flex: (screenSize)?0.9:0.8 }]}
          keyboardShouldPersistTaps='always'
        >
          <View>
            <Text style={styles.labelText}>
              Notes:
            </Text>
            <Field name="notes" component={this._renderInput} />
            <TouchableHighlight 
              underlayColor={Colors.steel}
              onPress={ handleSubmit(this._submit) } 
              style={styles.button}
              disabled={pristine || submitting}
            >
              <Text style={ styles.buttonText }>
                Create
              </Text>
            </TouchableHighlight> 
          </View>   
        </ScrollView>
        <View style={[ styles.showNotesContainer,{ flex: (screenSize)?0.1:0.2 } ]}>
          <TouchableOpacity style={ styles.button } onPress={ this.goToNotesList }>
            <Text style={ styles.buttonText }>
              Show Notes
            </Text>
          </TouchableOpacity>
        </View>
      </View>  
    )
  }
}

export default reduxForm({
  form: 'notes'
})(CreateNotes)
