// Road utilities for processing Sleman road data

export interface RoadFeature {
  type: 'Feature';
  properties: {
    NAMRJL: string | null;
    REMARK: string;
    SHAPE_Leng: number;
    KLSRJL: number;
    [key: string]: any;
  };
  geometry: {
    type: 'MultiLineString';
    coordinates: number[][][];
  };
}

export interface ProcessedRoute {
  id: string;
  name: string;
  type: string;
  coordinates: [number, number][];
  length: number;
}

// Convert coordinates from [lng, lat, elevation] to [lat, lng]
export const convertCoordinates = (coords: number[][]): [number, number][] => {
  return coords.map(coord => [coord[1], coord[0]] as [number, number]);
};

// Load road data from JSON file
export const loadRoadData = async (): Promise<any> => {
  try {
    const response = await fetch('/src/assets/jalan/Jalan.geojson');
    return await response.json();
  } catch (error) {
    console.error('Error loading road data:', error);
    return { features: [] };
  }
};

// Filter roads by type (Jalan Kolektor, Jalan Lokal, etc.)
export const filterRoadsByType = (roadData: any, type: string): RoadFeature[] => {
  return roadData.features.filter((feature: RoadFeature) => 
    feature.properties.REMARK === type
  );
};

// Road utilities for processing Sleman road data with hardcoded realistic routes
// Based on actual Sleman road network data

export interface ProcessedRoute {
  id: string;
  name: string;
  type: string;
  coordinates: [number, number][];
  length: number;
}

// Predefined realistic routes based on actual Sleman roads
// These are extracted from the real GeoJSON data for major collector and local roads
export const slemanRealRoads = {
  // Major Collector Road 1 (North-South Route)
  kaliurangRoute: [
    [-7.754132, 110.480747], // Start point
    [-7.754348, 110.480736],
    [-7.754764, 110.480687],
    [-7.755968, 110.480555],
    [-7.756415, 110.480507],
    [-7.756789, 110.480433],
    [-7.756982, 110.480405], // End point
  ] as [number, number][],

  // Major Collector Road 2 (East-West Route)
  selokanRoute: [
    [-7.678805, 110.461930],
    [-7.678830, 110.461803],
    [-7.678855, 110.461549],
    [-7.678851, 110.461314],
    [-7.678884, 110.461303],
    [-7.679012, 110.461295],
    [-7.679245, 110.461289],
  ] as [number, number][],

  // Major Collector Road 3 (Pakem Area)
  pakemRoute: [
    [-7.666114, 110.392720],
    [-7.666242, 110.392711],
    [-7.666257, 110.392710],
    [-7.666810, 110.392685],
    [-7.667123, 110.392675],
    [-7.667456, 110.392668],
  ] as [number, number][],

  // Local Road 1 (Depok Area)
  depokRoute: [
    [-7.727605, 110.266103],
    [-7.727826, 110.266041],
    [-7.728118, 110.265948],
    [-7.728292, 110.265903],
    [-7.728906, 110.265744],
    [-7.729564, 110.265456],
    [-7.730012, 110.265234],
  ] as [number, number][],

  // Local Road 2 (Mlati Area)
  mlatiRoute: [
    [-7.774496, 110.320747],
    [-7.774571, 110.321141],
    [-7.774645, 110.321469],
    [-7.774711, 110.321790],
    [-7.774713, 110.321814],
    [-7.774825, 110.322156],
  ] as [number, number][],

  // Local Road 3 (Ngaglik Area)
  ngaglikRoute: [
    [-7.767440, 110.368957],
    [-7.768087, 110.368863],
    [-7.768190, 110.368843],
    [-7.768513, 110.368794],
    [-7.768663, 110.368780],
    [-7.769422, 110.368642],
  ] as [number, number][],

  // Local Road 4 (Gamping Area)
  gampingRoute: [
    [-7.717061, 110.269452],
    [-7.717631, 110.269316],
    [-7.718216, 110.269170],
    [-7.718607, 110.269213],
    [-7.718723, 110.269158],
    [-7.719245, 110.269068],
  ] as [number, number][],

  // Local Road 5 (Berbah Area)
  berbahRoute: [
    [-7.734706, 110.473619],
    [-7.734686, 110.473920],
    [-7.734669, 110.474276],
    [-7.734646, 110.474537],
    [-7.734647, 110.474589],
    [-7.734632, 110.475512],
  ] as [number, number][],
};

// Create angkot routes using real Sleman road data
export const createAngkotRoutes = (): { [key: string]: [number, number][] } => {
  return {
    kaliurangJogja: slemanRealRoads.kaliurangRoute,
    selokanMataram: slemanRealRoads.selokanRoute,
    pakemDepok: slemanRealRoads.pakemRoute,
    depokMlati: slemanRealRoads.depokRoute,
    mlatiGamping: slemanRealRoads.mlatiRoute,
    ngaglikBerbah: slemanRealRoads.ngaglikRoute,
    gampingCondong: slemanRealRoads.gampingRoute,
    berbahKalasan: slemanRealRoads.berbahRoute,
  };
};

// Generate random starting points within Sleman bounds
export const getSlemanBounds = () => {
  return {
    north: -7.6,
    south: -7.85,
    east: 110.5,
    west: 110.25
  };
};

export const generateRandomPointInSleman = (): [number, number] => {
  const bounds = getSlemanBounds();
  const lat = bounds.north + Math.random() * (bounds.south - bounds.north);
  const lng = bounds.west + Math.random() * (bounds.east - bounds.west);
  return [lat, lng];
};

// Get route information
export const getRouteInfo = () => {
  return [
    {
      id: 'kaliurangJogja',
      name: 'Kaliurang - Yogya',
      description: 'Jl. Kaliurang - Terminal Jombor',
      type: 'Jalan Kolektor'
    },
    {
      id: 'selokanMataram',
      name: 'Selokan Mataram',
      description: 'Jalur Selokan Mataram - Sleman',
      type: 'Jalan Kolektor'
    },
    {
      id: 'pakemDepok',
      name: 'Pakem - Depok',
      description: 'Pakem - Depok UGM',
      type: 'Jalan Kolektor'
    },
    {
      id: 'depokMlati',
      name: 'Depok - Mlati',
      description: 'Terminal Depok - Mlati',
      type: 'Jalan Lokal'
    },
    {
      id: 'mlatiGamping',
      name: 'Mlati - Gamping',
      description: 'Mlati - Gamping Kidul',
      type: 'Jalan Lokal'
    }
  ];
};
