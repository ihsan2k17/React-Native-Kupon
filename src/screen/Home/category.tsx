import { View } from 'react-native';
import React from 'react';
import MasonryList from 'reanimated-masonry-list';
import CategoryCard from '../../components/home/categorycard';
import { images } from '../../components/constant/images';

const Category = () => {
    return (
        <View>
            <MasonryList
                data={images}
                keyExtractor={(item): string => item.id}
                numColumns={2}
                contentContainerStyle={{
                    paddingHorizontal: 8
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => <CategoryCard image={item.image} nama={item.nama} />}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}

export default Category;
