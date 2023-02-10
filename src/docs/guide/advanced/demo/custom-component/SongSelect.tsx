import React, { FunctionComponent, useMemo, useState } from 'react'
import { Button, Modal, Select } from 'antd'

interface SongSelectProps {
  value?: number
  onChange?: (value: number) => void
}

const option = [
  { id: 1, title: '晴天' },
  { id: 2, title: '告白气球' },
  { id: 3, title: '蒲公英的约定' },
]

export const SongSelect: FunctionComponent<SongSelectProps> = props => {
  const { value, onChange } = props
  const [showModal, setShowModal] = useState(false)

  const song = useMemo(() => option.find(item => item.id === value), [value])

  return (
    <>
      <Button onClick={() => setShowModal(true)}>选择歌曲</Button>
      {song && (
        <span style={{ marginLeft: 10 }}>已选歌曲: {song?.title}</span>
      )}

      <Modal
        title="选择歌曲"
        footer={false}
        open={showModal}
        onCancel={() => setShowModal(false)}
      >
        <Select
          style={{ width: '100%' }}
          value={value}
          onChange={(value: number) => {
            setShowModal(false)
            onChange && onChange(value)
          }}
        >
          {option.map(p => (
            <Select.Option key={p.id} value={p.id}>
              {p.title}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  )
}
