import React, {useContext} from 'react'
import {Text, View, ScrollView, TouchableOpacity} from 'react-native'
//Styling
import styles from './style'
import {tailwind} from '../../style/tailwind'
//Components
import {SvgUri} from 'react-native-svg'
//Others
import {StaticContext} from '../../contexts'

export default ({navigation}) => {
  const {allCategories} = useContext(StaticContext)
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.categoryListContainer}>
        {allCategories.response.map((category, index) => (
          <View
            key={index}
            style={tailwind('justify-center items-center mb-4')}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Products', {categoryId: category._id})
              }
              style={
                index % 2 === 0
                  ? styles.categoryContainer
                  : {...styles.categoryContainer, backgroundColor: '#d5f4e4'}
              }>
              <SvgUri width={80} height={80} uri={category.icon} />
            </TouchableOpacity>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
