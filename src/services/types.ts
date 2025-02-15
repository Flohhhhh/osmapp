import type Vocabulary from '../locales/vocabulary';
import type { getSchemaForFeature } from './tagging/idTaggingScheme';

export interface ImageUrls {
  source?: string;
  link: string;
  thumb: string;
  username?: string;
  portrait?: boolean;
  timestamp?: string;
}

export type LoadingImage = null;
export type NoImage = undefined;

export type Image = ImageUrls | LoadingImage | NoImage;

// coordinates in geojson format: [lon, lat] = [x,y]
export type LonLat = number[];
export type LonLatRounded = string[];
export type Position = LonLat; // TODO merge those two types
export type PositionBoth = LonLat | LonLatRounded;

export interface Point {
  type: 'Point';
  coordinates: Position;
}

export interface LineString {
  type: 'LineString';
  coordinates: Position[];
}

export type FeatureGeometry = Point | LineString;

export const isPoint = (geometry: FeatureGeometry): geometry is Point =>
  geometry?.type === 'Point';
export const isWay = (geometry: FeatureGeometry): geometry is LineString =>
  geometry?.type === 'LineString';

export interface FeatureTags {
  [key: string]: string;
}

interface RelationMember {
  ref: string;
  role: string;
  type: string;
}

// TODO split in two types /extend/
export interface Feature {
  point?: boolean;
  type: 'Feature';
  geometry?: FeatureGeometry;
  osmMeta: {
    type: string;
    id: string;
    visible?: string;
    version?: string;
    changeset?: string;
    timestamp?: string;
    user?: string;
    uid?: string;
    lat?: string;
    lon?: string;
  };
  tags: FeatureTags;
  members?: RelationMember[];
  properties: {
    class: string;
    subclass: string;
  };
  center: Position;
  roundedCenter?: LonLatRounded;
  ssrFeatureImage?: Image;
  error?: 'deleted' | 'network' | 'unknown' | '404' | '500'; // etc.
  schema?: ReturnType<typeof getSchemaForFeature>;

  // skeleton
  layer?: { id: string };
  source?: string;
  sourceLayer?: string;
  state?: { hover: boolean };
  skeleton?: boolean;
  nonOsmObject?: boolean;

  // preview
  noPreviewButton?: boolean;
}

export type MessagesType = typeof Vocabulary;
export type TranslationId = keyof MessagesType;
