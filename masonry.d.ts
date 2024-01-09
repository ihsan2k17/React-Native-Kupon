import { ImageURISource } from 'react-native';

declare module 'reanimated-masonry-list' {

    export type ImageSourcePropType = ImageURISource | ImageURISource[] | number | {
        uri?: string;
        width?: number;
        height?: number;
    };
}
