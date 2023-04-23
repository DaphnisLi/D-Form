import React, { useState, useCallback } from 'react'
import { Row, Col } from 'antd'

interface VirtualListProps<T> {
  columns: {
    title: React.ReactNode
    dataIndex: string
    render: (text: any, record: T, index: number) => React.ReactNode
  }[]
  dataSource: T[]
  visibleHeight?: number
  rowHeight: number
  footer?: (data: readonly T[]) => React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const VirtualList = <T extends object>(props: VirtualListProps<T>) => {
  const {
    columns,
    dataSource,
    visibleHeight = 500,
    rowHeight,
    footer,
    style,
    ...resetProps
  } = props

  const visibleCount = Math.ceil(visibleHeight / rowHeight)
  // 缓存数据量
  // 为什么缓存一份 ？因为上下要各缓存一份, 降低 set 次数
  // 渲染 2 份会不会有性能问题 ？不会, 因为 visibleHeight 通常不会超过 1000 px
  const cacheCount = visibleCount
  const renderCount = visibleCount + cacheCount
  const totalCount = dataSource.length
  const columnNum = columns.length
  const head = columns.map(item => item.title)
  const [startIndex, setStartIndex] = useState(0)

  const handleSliceData = useCallback((star: number, end: number) => {
    return dataSource.slice(star, end)
  }, [dataSource])

  const [list, setList] = useState(handleSliceData(0, renderCount))
  const [listTop, setListTop] = useState(0)

  const scrollEvent = useCallback((e) => {
    const curIndex = Math.floor(e.target.scrollTop / rowHeight)
    // 偏移量
    const offset = curIndex - startIndex
    // 向下滚动优化, 设置缓存数据
    // totalCount - curIndex <= visibleCount + cacheCount: 如果向下滚动到底部后往 dataSource push 了一些数据, 则此时缓存数据为 0 , 会出现短暂的空白
    if (offset >= 0 && (offset >= cacheCount || totalCount - curIndex <= renderCount)) {
      setList(handleSliceData(curIndex, curIndex + renderCount))
    } else if (offset < 0) {
      // 向上滚动暂时无法优化, 只能缓存后面的数据, 不能缓存前面的数据, 因为 list 是从 0 开始渲染的
      setList(handleSliceData(curIndex, curIndex + renderCount))
    } else {
      // 向下滚动偏移量不足 cacheCount
      return
    }
    setStartIndex(curIndex)
    setListTop(curIndex * rowHeight) // 为什么不直接用 scrollTop, 因为会出现抖动
  }, [handleSliceData, startIndex])

  return (
    <>
      <Row justify="space-around" style={{ marginBottom: 20 }}>
        {head.map((item, index) => (
          <Col
            style={{ textAlign: 'center' }}
            span={Math.floor(24 / columnNum)}
            key={index}>{item}</Col>
        ))}
      </Row>
      <div
        style={{
          height: visibleHeight,
          overflow: 'auto',
          position: 'relative',
          overscrollBehavior: 'contain' // 防止滚动影响到其他元素
        }}
        onScroll={scrollEvent}
      >
        <div style={{ height: totalCount * rowHeight }}></div>
        <Row
          {...resetProps}
          style={{
            ...style,
            position: 'absolute',
            top: listTop,
          }}
          justify="space-around"
        >
          {list.map((item, index) => columns.map(c => (
            <Col
              span={Math.floor(22 / columnNum)} // 22 各列留点间隔
              key={c.dataIndex + index}
              style={{ textAlign: 'center' }}
            >
              <div>{c.render(item[c.dataIndex], item, index + startIndex)}</div>
            </Col>))
          )}
        </Row>
      </div>
      {footer && (
        <Row style={{ marginTop: 20 }}>
          <Col span={24}>{footer?.(list)}</Col>
        </Row>
      )}
    </>
  )
}

export default VirtualList
