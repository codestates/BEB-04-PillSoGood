import React from 'react';
import { StyleSheet, Text, ScrollView, View, Animated, Dimensions } from 'react-native';
import Card from '../components/Card'


const Home = () => {
	const [shouldShow, setShouldShow] = useState(true);
	return (
		<View>
			{shouldShow ? (
				<Card />
			) : null}
			<Button
				title="확인"
				onPress={() => setShouldShow(!shouldShow)}
			/>
		</View>
	)
}
1
export default Home;
