export interface BuildingData {
  id: string
  name: string
  type: '办公楼' | '厂房' | '研发中心' | '综合楼'
  floors: number
  position: [number, number, number]
  size: [number, number, number]
  color: string
  highlightColor: string
  occupancyRate: number
  enterprises: string[]
  floorsData: FloorData[]
}

export interface FloorData {
  floor: number
  name: string
  occupancy: number
  maxOccupancy: number
  tenant: string
}

export interface ParkStats {
  totalOccupancy: number
  todayEnergy: number
  parkingUsed: number
  parkingTotal: number
  notices: string[]
}

export const buildings: BuildingData[] = [
  {
    id: 'office-a',
    name: 'A座 · 创新大厦',
    type: '办公楼',
    floors: 18,
    position: [-12, 4.5, -6],
    size: [5, 9, 5],
    color: '#3b82f6',
    highlightColor: '#60a5fa',
    occupancyRate: 92,
    enterprises: ['字节跳动', '美团', '哔哩哔哩', '小红书'],
    floorsData: [
      { floor: 1, name: '大厅', occupancy: 1, maxOccupancy: 1, tenant: '物业中心' },
      { floor: 2, name: '2F', occupancy: 85, maxOccupancy: 100, tenant: '字节跳动' },
      { floor: 3, name: '3F', occupancy: 90, maxOccupancy: 100, tenant: '字节跳动' },
      { floor: 4, name: '4F', occupancy: 88, maxOccupancy: 100, tenant: '字节跳动' },
      { floor: 5, name: '5F', occupancy: 92, maxOccupancy: 100, tenant: '美团' },
      { floor: 6, name: '6F', occupancy: 95, maxOccupancy: 100, tenant: '美团' },
      { floor: 7, name: '7F', occupancy: 80, maxOccupancy: 100, tenant: '哔哩哔哩' },
      { floor: 8, name: '8F', occupancy: 78, maxOccupancy: 100, tenant: '哔哩哔哩' },
      { floor: 9, name: '9F', occupancy: 95, maxOccupancy: 100, tenant: '小红书' },
      { floor: 10, name: '10F', occupancy: 90, maxOccupancy: 100, tenant: '小红书' },
      { floor: 11, name: '11F', occupancy: 88, maxOccupancy: 100, tenant: '小红书' },
      { floor: 12, name: '12F', occupancy: 100, maxOccupancy: 100, tenant: '小红书' },
      { floor: 13, name: '13F', occupancy: 82, maxOccupancy: 100, tenant: '共享办公' },
      { floor: 14, name: '14F', occupancy: 75, maxOccupancy: 100, tenant: '共享办公' },
      { floor: 15, name: '15F', occupancy: 96, maxOccupancy: 100, tenant: '会议中心' },
      { floor: 16, name: '16F', occupancy: 90, maxOccupancy: 100, tenant: '行政办公' },
      { floor: 17, name: '17F', occupancy: 85, maxOccupancy: 100, tenant: '行政办公' },
      { floor: 18, name: '18F', occupancy: 60, maxOccupancy: 100, tenant: '空中花园' },
    ],
  },
  {
    id: 'office-b',
    name: 'B座 · 科技大厦',
    type: '办公楼',
    floors: 15,
    position: [-12, 3.75, 6],
    size: [5, 7.5, 5],
    color: '#8b5cf6',
    highlightColor: '#a78bfa',
    occupancyRate: 87,
    enterprises: ['阿里巴巴', '蚂蚁集团', '钉钉'],
    floorsData: [
      { floor: 1, name: '大厅', occupancy: 1, maxOccupancy: 1, tenant: '物业中心' },
      { floor: 2, name: '2F', occupancy: 88, maxOccupancy: 100, tenant: '阿里巴巴' },
      { floor: 3, name: '3F', occupancy: 90, maxOccupancy: 100, tenant: '阿里巴巴' },
      { floor: 4, name: '4F', occupancy: 85, maxOccupancy: 100, tenant: '阿里巴巴' },
      { floor: 5, name: '5F', occupancy: 92, maxOccupancy: 100, tenant: '蚂蚁集团' },
      { floor: 6, name: '6F', occupancy: 80, maxOccupancy: 100, tenant: '蚂蚁集团' },
      { floor: 7, name: '7F', occupancy: 78, maxOccupancy: 100, tenant: '蚂蚁集团' },
      { floor: 8, name: '8F', occupancy: 95, maxOccupancy: 100, tenant: '钉钉' },
      { floor: 9, name: '9F', occupancy: 88, maxOccupancy: 100, tenant: '钉钉' },
      { floor: 10, name: '10F', occupancy: 82, maxOccupancy: 100, tenant: '钉钉' },
      { floor: 11, name: '11F', occupancy: 90, maxOccupancy: 100, tenant: '共享空间' },
      { floor: 12, name: '12F', occupancy: 85, maxOccupancy: 100, tenant: '共享空间' },
      { floor: 13, name: '13F', occupancy: 80, maxOccupancy: 100, tenant: '培训中心' },
      { floor: 14, name: '14F', occupancy: 92, maxOccupancy: 100, tenant: '展厅' },
      { floor: 15, name: '15F', occupancy: 70, maxOccupancy: 100, tenant: '屋顶花园' },
    ],
  },
  {
    id: 'factory-a',
    name: '1号厂房 · 智能制造',
    type: '厂房',
    floors: 3,
    position: [10, 1.5, -8],
    size: [8, 3, 8],
    color: '#f59e0b',
    highlightColor: '#fbbf24',
    occupancyRate: 95,
    enterprises: ['宁德时代', '比亚迪电子'],
    floorsData: [
      { floor: 1, name: '1F', occupancy: 98, maxOccupancy: 100, tenant: '宁德时代 · 产线A' },
      { floor: 2, name: '2F', occupancy: 95, maxOccupancy: 100, tenant: '宁德时代 · 产线B' },
      { floor: 3, name: '3F', occupancy: 92, maxOccupancy: 100, tenant: '比亚迪电子' },
    ],
  },
  {
    id: 'factory-b',
    name: '2号厂房 · 生物医药',
    type: '厂房',
    floors: 4,
    position: [10, 2, 8],
    size: [8, 4, 6],
    color: '#10b981',
    highlightColor: '#34d399',
    occupancyRate: 88,
    enterprises: ['药明康德', '恒瑞医药'],
    floorsData: [
      { floor: 1, name: '1F', occupancy: 90, maxOccupancy: 100, tenant: '药明康德 · 研发' },
      { floor: 2, name: '2F', occupancy: 85, maxOccupancy: 100, tenant: '药明康德 · 生产' },
      { floor: 3, name: '3F', occupancy: 92, maxOccupancy: 100, tenant: '恒瑞医药' },
      { floor: 4, name: '4F', occupancy: 82, maxOccupancy: 100, tenant: '恒瑞医药' },
    ],
  },
  {
    id: 'rd-center',
    name: '研发中心 · 未来实验室',
    type: '研发中心',
    floors: 8,
    position: [0, 2, 0],
    size: [6, 4, 6],
    color: '#ec4899',
    highlightColor: '#f472b6',
    occupancyRate: 96,
    enterprises: ['华为', '中科院', '清华研究院'],
    floorsData: [
      { floor: 1, name: '1F', occupancy: 100, maxOccupancy: 100, tenant: '华为 · AI Lab' },
      { floor: 2, name: '2F', occupancy: 98, maxOccupancy: 100, tenant: '华为 · 芯片实验室' },
      { floor: 3, name: '3F', occupancy: 95, maxOccupancy: 100, tenant: '中科院 · 量子计算' },
      { floor: 4, name: '4F', occupancy: 92, maxOccupancy: 100, tenant: '中科院 · 生物信息' },
      { floor: 5, name: '5F', occupancy: 96, maxOccupancy: 100, tenant: '清华研究院' },
      { floor: 6, name: '6F', occupancy: 100, maxOccupancy: 100, tenant: '清华研究院' },
      { floor: 7, name: '7F', occupancy: 88, maxOccupancy: 100, tenant: '联合实验室' },
      { floor: 8, name: '8F', occupancy: 95, maxOccupancy: 100, tenant: '学术报告厅' },
    ],
  },
  {
    id: 'complex',
    name: '综合服务中心',
    type: '综合楼',
    floors: 5,
    position: [-2, 1.25, -14],
    size: [10, 2.5, 4],
    color: '#06b6d4',
    highlightColor: '#22d3ee',
    occupancyRate: 100,
    enterprises: ['星巴克', '711便利店', '健身房', '银行', '餐饮中心'],
    floorsData: [
      { floor: 1, name: '1F', occupancy: 100, maxOccupancy: 100, tenant: '星巴克 / 711 / 银行' },
      { floor: 2, name: '2F', occupancy: 100, maxOccupancy: 100, tenant: '餐饮中心' },
      { floor: 3, name: '3F', occupancy: 100, maxOccupancy: 100, tenant: '健身房 / 瑜伽馆' },
      { floor: 4, name: '4F', occupancy: 100, maxOccupancy: 100, tenant: '会议中心' },
      { floor: 5, name: '5F', occupancy: 100, maxOccupancy: 100, tenant: '行政服务大厅' },
    ],
  },
]

export const parkStats: ParkStats = {
  totalOccupancy: 93.5,
  todayEnergy: 28456,
  parkingUsed: 342,
  parkingTotal: 500,
  notices: [
    '本周五下午2点举办园区企业交流会，地点：综合服务中心4F',
    '6月20日进行消防演练，请各企业配合',
    '新增新能源充电桩已投入使用，位于B区停车场',
  ],
}

// 视角配置
export const viewConfigs = {
  bird: { position: [35, 40, 35] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  ground: { position: [30, 8, 30] as [number, number, number], target: [0, 2, 0] as [number, number, number] },
}
