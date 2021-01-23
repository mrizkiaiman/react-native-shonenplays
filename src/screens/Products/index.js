import React, {useState} from 'react'
import {ScrollView, View, TouchableOpacity} from 'react-native'
import ProductData from '../../../staticData/products'
//Styling
import styles from './style'
//Components
import {Product, Search} from '../../components'
//Functions
import {useFetchHandler} from '../../hooks'

export default ({navigation, route: {params}}) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const Products = ProductData.filter((product) => product.isPopular === true)

  return (
    <ScrollView>
      <Search
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <View style={styles.mainContainer}>
        {Products.map((product, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('ProductDetails', {product})}>
            <Product product={product} customStyle={{margin: 8}} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}
