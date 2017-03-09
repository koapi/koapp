import React from 'react'
import { Provider, Header, Body } from 'reactabular-table'
import _ from 'lodash'
import * as presets from './presets'

export function column (property, label, definition) {
  const base = {property, header: { label }}
  return _.merge(base, definition)
}

export default class extends React.Component {
  render () {
    const { rows, columns, preset } = this.props
    return (
      <Provider columns={columns} components={presets[preset || 'responsive'].components}>
        <Header />
        <Body rows={rows} rowKey='id' />
      </Provider>
    )
  }
}