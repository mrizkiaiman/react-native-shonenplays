import React, {useState, useMemo} from 'react'
import {Text, View, ScrollView} from 'react-native'
import {Categories} from '../../mockdata'
//Styling
import styles from './style'
import {Size} from '../../style'
import {tailwind} from '../../style/tailwind'
//Assets
//Components
import {Search, Category} from '../../components'
import {PopularCategory} from './components'
//Functions
import {useFetchHandler} from '../../hooks'

export default ({navigation}) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const popularKeywords = ['AJ1 Chicago', 'Shonen JUMP!', 'One Piece']
  const popularCategoryList = useMemo(() => {
    return Categories.filter((category) => category.isPopular === true)
  }, [])

  return (
    <ScrollView style={tailwind('bg-white')}>
      <View style={styles.mainContainer}>
        <Search
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          customStyles={{
            backgroundColor: '#F6F7F8',
          }}
          onSubmit={() =>
            navigation.navigate('Products', {keyword: searchKeyword})
          }
        />
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.titleSectionText}>Popular search</Text>
            <Text style={styles.functionalText}>Clear</Text>
          </View>
          {popularKeywords.map((keyword, index) => (
            <Text
              onPress={() => setSearchKeyword(keyword)}
              style={styles.popularKeywordText}
              key={index}>
              {keyword}
            </Text>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.titleSectionText}>Top categories</Text>
          </View>
          <ScrollView horizontal style={styles.sectionContentContainer}>
            {popularCategoryList.map((category, index) => (
              <PopularCategory key={index} category={category} />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  )
}
