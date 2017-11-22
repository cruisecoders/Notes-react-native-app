import React,{ Component } from 'react';
import { View,Text,Modal } from 'react-native';

import styles from './Styles/ModalStyle';

export default class Loader extends Component{
	constructor(props){
		super(props);

		this.state = {

		}
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	handleCloseModal = () => {
		console.log("Modal Closed");
		this.props.closeModal()
	}

	render(){
		const {text} = this.props;
		return(
			<Modal  transparent={true}         
							visible={this.props.isOpenModal}
							onRequestClose={this.handleCloseModal}
			>
				<View style={ styles.mainContainer}>
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.headerText}>
								NOTE
							</Text>
						</View>	
						<Text style={{ padding:20 }}>
							{text}
						</Text>
					</View>
				</View>        
			</Modal>    
		)
	}
}