import React, {useRef} from 'react'
import {ScrollView, View, Text, Image} from 'react-native'
import PopularCategories from './hardcode/popular'
import Categories from './hardcode/categories'
//Styling
import styles from './style'
import {Size} from '../../style'
import {tailwind} from '../../style/tailwind'
const {width, height} = Size
//Components
import {Modalize} from 'react-native-modalize'
import SearchBar from '../../components/SearchBar'
import Carousel from './components/Carousel'
import PopularCategory from './components/PopularCategory'
import Category from './components/Category'

export default function Home() {
  const modalRef = useRef(null)
  const modalAction = (action) => {
    const modal = modalRef.current
    if (modal) {
      if (action === 'open') {
        modal.open()
      } else if (action === 'close') {
        modal.close()
      }
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerContentContainer}>
              <Text style={styles.bannerShonenText}>
                Shonen<Text style={styles.bannerPlaysText}>Plays</Text>
              </Text>
              <Text style={styles.welcomeUserText}>
                Welcome, M. Rizki Aiman
              </Text>
              <SearchBar
                customStyle={{
                  container: {
                    marginTop: 24,
                  },
                }}
              />
            </View>
            <View style={styles.carouselContainer}>
              <Carousel />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.titleSectionText}>Popular</Text>
              <Text style={styles.functionalText}>See all</Text>
            </View>
            <ScrollView horizontal style={styles.sectionContentContainer}>
              {PopularCategories.map((category, index) => (
                <PopularCategory key={index} {...category} />
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              ...styles.sectionContainer,
              marginTop: 40,
              marginBottom: 30,
            }}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.titleSectionText}>Vouchers</Text>
              <Text style={styles.functionalText}>See all</Text>
            </View>
            <ScrollView horizontal style={styles.sectionContentContainer}>
              <View style={styles.voucherImageContainer}>
                <Image
                  source={require('../../assets/Vouchers/voucher-1.png')}
                  style={styles.voucherImage}
                />
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              ...styles.sectionContainer,
              ...tailwind('mt-2 mb-7'),
              width,
            }}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.titleSectionText}>Categories</Text>
              <Text style={styles.functionalText}>See all</Text>
            </View>
            <View
              style={tailwind(
                'flex-row flex-wrap items-center justify-between',
              )}>
              {Categories.slice(0, 8).map((category, index) => (
                <Category key={index} {...category} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Modalize ref={modalRef} modalHeight={400}></Modalize>
    </>
  )
}
