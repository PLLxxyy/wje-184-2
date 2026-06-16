import React, { useState, useCallback } from 'react'
import ParkScene from './components/Scene'
import { buildings, parkStats, BuildingData } from './data'

type ViewMode = 'bird' | 'ground' | 'inside'

export default function App() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('bird')
  const [targetBuilding, setTargetBuilding] = useState<BuildingData | null>(null)
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null)

  const handleSelectBuilding = useCallback((building: BuildingData | null) => {
    setSelectedBuilding(building)
    if (building) {
      setViewMode('bird')
      setTargetBuilding(null)
    }
  }, [])

  const handleBuildingListClick = useCallback((building: BuildingData) => {
    setSelectedBuilding(building)
    setTargetBuilding(building)
    setViewMode('bird')
  }, [])

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode)
    if (mode === 'inside' && selectedBuilding) {
      setTargetBuilding(selectedBuilding)
    } else if (mode === 'bird' || mode === 'ground') {
      setTargetBuilding(null)
    }
  }, [selectedBuilding])

  const handleClosePanel = useCallback(() => {
    setSelectedBuilding(null)
    setViewMode('bird')
    setTargetBuilding(null)
  }, [])

  const handleEnterBuilding = useCallback(() => {
    if (selectedBuilding) {
      setViewMode('inside')
      setTargetBuilding(selectedBuilding)
    }
  }, [selectedBuilding])

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1>智慧园区 3D 数字孪生平台</h1>
      </div>

      {/* Main 3D Canvas */}
      <div className="main-content">
        <div className="canvas-container">
          <ParkScene
            buildings={buildings}
            selectedBuilding={selectedBuilding}
            onSelectBuilding={handleSelectBuilding}
            viewMode={viewMode}
            targetBuilding={targetBuilding}
            hoveredBuilding={hoveredBuilding}
            setHoveredBuilding={setHoveredBuilding}
          />
        </div>

        {/* Left sidebar - Building list */}
        <div className="building-list">
          <div className="building-list-header">楼栋列表</div>
          <div className="building-list-items">
            {buildings.map((b) => (
              <div
                key={b.id}
                className={`building-item ${selectedBuilding?.id === b.id ? 'active' : ''}`}
                onClick={() => handleBuildingListClick(b)}
              >
                <div className="building-item-dot" style={{ background: b.color }} />
                <span className="building-item-name">{b.name}</span>
                <span className="building-item-type">{b.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View switcher - only when no panel open */}
        {!selectedBuilding && (
          <div className="view-switcher">
            <button
              className={`view-btn ${viewMode === 'bird' ? 'active' : ''}`}
              onClick={() => handleViewChange('bird')}
            >
              鸟瞰视角
            </button>
            <button
              className={`view-btn ${viewMode === 'ground' ? 'active' : ''}`}
              onClick={() => handleViewChange('ground')}
            >
              平视视角
            </button>
          </div>
        )}

        {/* Building info panel */}
        {selectedBuilding && viewMode !== 'inside' && (
          <div className="info-panel">
            <div className="info-panel-header">
              <span className="info-panel-title">{selectedBuilding.name}</span>
              <button className="info-panel-close" onClick={handleClosePanel}>
                &times;
              </button>
            </div>
            <div className="info-panel-body">
              <div className="info-row">
                <span className="info-label">楼栋类型</span>
                <span className="info-value">{selectedBuilding.type}</span>
              </div>
              <div className="info-row">
                <span className="info-label">楼层总数</span>
                <span className="info-value">{selectedBuilding.floors} 层</span>
              </div>
              <div className="info-row">
                <span className="info-label">入驻率</span>
                <span className="info-value rate">{selectedBuilding.occupancyRate}%</span>
              </div>
              <div className="info-enterprises">
                <div className="info-enterprises-title">入驻企业</div>
                <div>
                  {selectedBuilding.enterprises.map((e, i) => (
                    <span key={i} className="enterprise-tag">{e}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button
                  className={`view-btn ${viewMode === 'bird' ? 'active' : ''}`}
                  onClick={() => handleViewChange('bird')}
                >
                  鸟瞰视角
                </button>
                <button
                  className={`view-btn ${viewMode === 'ground' ? 'active' : ''}`}
                  onClick={() => handleViewChange('ground')}
                >
                  平视视角
                </button>
                <button className="view-btn" onClick={handleEnterBuilding}>
                  进入楼层
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floor layout panel - inside view */}
        {viewMode === 'inside' && selectedBuilding && (
          <div className="floor-panel">
            <div className="floor-panel-header">
              <span className="info-panel-title">{selectedBuilding.name} · 楼层布局</span>
              <button className="info-panel-close" onClick={handleClosePanel}>
                &times;
              </button>
            </div>
            <div className="floor-panel-body">
              {selectedBuilding.floorsData.slice().reverse().map((floor) => {
                const pct = Math.round((floor.occupancy / floor.maxOccupancy) * 100)
                const barColor = pct >= 90 ? '#22c55e' : pct >= 70 ? '#f59e0b' : '#ef4444'
                return (
                  <div key={floor.floor} className="floor-row">
                    <span className="floor-label">{floor.name}</span>
                    <div className="floor-bar-bg">
                      <div
                        className="floor-bar"
                        style={{ width: `${pct}%`, background: barColor }}
                      />
                    </div>
                    <span className="floor-info">{pct}% · {floor.tenant}</span>
                  </div>
                )
              })}
              <button className="back-btn" onClick={() => {
                setViewMode('bird')
                setTargetBuilding(null)
              }}>
                返回鸟瞰
              </button>
            </div>
          </div>
        )}

        {/* Bottom stats panel */}
        <div className="bottom-panel">
          <div className="stat-card">
            <div className="stat-label">总入驻率</div>
            <div className="stat-value green">{parkStats.totalOccupancy}%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">今日能耗</div>
            <div className="stat-value orange">{parkStats.todayEnergy.toLocaleString()}</div>
            <div className="stat-unit">kWh</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">停车位使用</div>
            <div className="stat-value">{parkStats.parkingUsed}</div>
            <div className="stat-unit">/ {parkStats.parkingTotal}</div>
          </div>
          <div className="notice-card">
            <div className="notice-title">园区公告</div>
            <div className="notice-content">
              {parkStats.notices.map((n, i) => (
                <div key={i} style={{ marginBottom: i < parkStats.notices.length - 1 ? 6 : 0 }}>
                  · {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
