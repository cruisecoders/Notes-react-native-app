import React, { Component } from 'react'
import { 
  ScrollView, 
  Text,
  View,
	AsyncStorage,
	ActivityIndicator,
	ToastAndroid,
	FlatList,
	RefreshControl
} from 'react-native'
import { List,ListItem } from 'react-native-elements';

import FullTextModal from './FullTextModal';

export default class NotesListScreen extends Component{
	static navigationOptions = ({ navigation }) => {
		return{
			title:'Notes list',
			headerStyle:{
				elevation:0,
				height:60
			},
			headerTitleStyle:{
				alignSelf:'center', 
				textAlign:'center'               
			},
			headerRight: (<View></View>)
		}
	}
	constructor(props){
		super(props);

		this.state = {
			notesList:[],
			isFetching:true,
			error:false,
			isVisible:false,
			refreshing:false
		}
		this.fetchNotesList = this.fetchNotesList.bind(this);
		this._handleCloseModal = this._handleCloseModal.bind(this);
	}
	async fetchNotesList () {
		let key = '@App:Notes'
		try{
			let response = await AsyncStorage.getItem(key); 
			let notesList = await JSON.parse(response) || []; 
			console.log(notesList);
			this.setState({ 
				notesList,
				isFetching:false
			}); 
		} catch(error){
			console.log(error);
			this.setState({ 
				error:true,
				isFetching:false
			})
			ToastAndroid.showWithGravityAndOffset('Error Fetching Notes', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
		}
	} 
		
	componentDidMount(){
		this.fetchNotesList();
	}

	showFullText(item){
		this.setState({
			isVisible:true,
			selectedItemText:item.notes,
		})
	}
	_onRefresh(){
		const self = this
		this.setState({ refreshing:true });
		this.fetchNotesList()
		.then(() => {
			self.setState({ refreshing:false })
		});
	}
	_handleCloseModal(){
		this.setState({
			isVisible:false
		})
	}
	render(){
		const {isFetching,error} = this.state;
		if(isFetching){
			return (
				<ActivityIndicator />	
			)
		}
		if(error){
			return <Text> Error retrieving Data </Text>
		}
		return(
			<View>
				<List>
					<FlatList
						data={this.state.notesList}
						renderItem={ ({ item,index }) => (
							<ListItem
								key={index}
								title={item.notes}
								onPress={ this.showFullText.bind(this,item)}
								hideChevron={true}
							/>	
						)}
						keyExtractor={item => item.notes}
						refreshControl = {
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={ this._onRefresh.bind(this) }
							/>
						}
					/>
				</List>
				<FullTextModal
					isOpenModal={this.state.isVisible}
					text={this.state.selectedItemText}
					closeModal={this._handleCloseModal}	
				/>
			</View>			
		)
	}
}
