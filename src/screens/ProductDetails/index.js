import React, {useState, useMemo} from 'react'
import {Text, View, ScrollView, Image} from 'react-native'
import {useDispatch} from 'react-redux'
import {Categories} from '../../mockdata'
//Styling
import styles from './style'
import {Size} from '../../style'
import {tailwind} from '../../style/tailwind'
//Components
import {Product, QtyControl} from '../../components'
import {FooterButton, ScrollViewBounced} from '../../parts'
//Functions
import {useAPI} from '../../hooks'
import {IDRFormat, Toast} from '../../utils'
import {AddToCart} from '../../services/cart'
import {updateCart} from '../../store/actions/cart'
import {FetchProductsByCategory} from '../../services/products'

export default ({route: {params}, navigation}) => {
  const [qty, setQty] = useState(1)
  const {product} = params
  const dispatch = useDispatch()
  const productsByCategory = useAPI(FetchProductsByCategory, product.category)
  const relatedProducts = productsByCategory.response.filter(
    (item) => item._id !== product._id,
  )

  const addToCartOnSubmit = async () => {
    const updatedCart = await AddToCart({
      productId: product._id,
      qty,
      price: product.price,
    })
    dispatch(updateCart(updatedCart.data))
    Toast({title: 'Success', text: 'Added to cart!'})
    navigation.goBack()
  }

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <ScrollViewBounced color={'white'} />
        <View style={styles.mainContentContainer}>
          <Image source={{uri: product.img}} style={styles.productImage} />
          <Text style={styles.productNameText}>{product.name}</Text>
          <Text style={styles.priceText}>Rp{IDRFormat(product.price)}</Text>
          <Text style={styles.descriptionText}>
            The manga series within the magazine target young male readers and
            tend to consist of many action scenes and a fair amount of comedy.
            The chapters of series that run in Weekly Shōnen Jump are collected
            and published in tankōbon volumes under the "Jump Comics" imprint
            every two to three months.
          </Text>
          <View style={styles.qtyControlContainer}>
            <QtyControl value={qty} setValue={setQty} />
          </View>
        </View>
        <View style={styles.relatedProductsContainer}>
          <Text style={styles.relatedProductText}>Related Products</Text>
          <ScrollView style={{marginStart: -10}} horizontal>
            {relatedProducts.map((product, index) => (
              <Product
                key={index}
                customStyle={tailwind('mr-3')}
                product={product}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View>
        <FooterButton
          onSubmit={() => addToCartOnSubmit()}
          styling={{
            buttonStyle: styles.addToCartButton,
            textStyle: styles.addToCartButtonText,
          }}
          title="Add to cart"
        />
      </View>
    </>
  )
}

//   status
//   _id
//   name
//   description
//   img
//   stock
//   price
//   weight
//   category
