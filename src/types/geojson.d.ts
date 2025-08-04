declare module "*.geojson" {
  interface GeoJSONFeature {
    type: 'Feature';
    properties: {
      NAMRJL: string | null;
      KONRJL: number;
      MATRJL: number;
      FGSRJL: number;
      UTKRJL: number;
      TOLRJL: number;
      WLYRJL: number;
      AUTRJL: number;
      KLSRJL: number;
      SPCRJL: number;
      JPARJL: number;
      ARHRJL: number;
      STARJJL: number;
      KLLRJL: string | null;
      MEDRJL: number;
      LOCRJL: number;
      JARRJL: number;
      FCODE: string | null;
      REMARK: string;
      SRS_ID: string | null;
      LCODE: string;
      METADATA: string | null;
      SHAPE_Leng: number;
    };
    geometry: {
      type: 'MultiLineString';
      coordinates: number[][][];
    };
  }

  interface GeoJSONData {
    type: 'FeatureCollection';
    name: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    features: GeoJSONFeature[];
  }

  const value: GeoJSONData;
  export default value;
}
