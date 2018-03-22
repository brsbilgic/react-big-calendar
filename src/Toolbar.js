import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from './utils/constants'
import withWidth from 'material-ui/utils/withWidth'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
  }

  render() {
    let { messages, label, width } = this.props
    const rbcToolbarStyle =
      width === 1 ? { flexDirection: 'column' } : { flexDirection: 'row' }
    const margin = width === 1 ? { marginBottom: '10px' } : {}

    return (
      <div className="rbc-toolbar" style={rbcToolbarStyle}>
        <div className="rbc-btn-group" style={margin}>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </div>

        <div className="rbc-toolbar-label" style={margin}>
          {label}
        </div>

        <div className="rbc-btn-group" style={margin}>
          {this.viewNamesGroup(messages)}
        </div>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

export default withWidth()(Toolbar)
