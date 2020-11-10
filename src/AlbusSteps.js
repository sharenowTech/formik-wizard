import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Steps extends Component {
  getStepObjects() {
    return this.props.steps.map((step) => ({ id: step }))
  }

  initWizard() {
    this.context.wizard.init(this.getStepObjects())
  }

  componentWillMount() {
    this.initWizard()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.steps.join('|') !== this.props.steps.join('|')) {
      this.initWizard()
    }
  }

  render() {
    const { id: activeId } = this.props.step || this.context.wizard.step
    const [child = null] = React.Children.toArray(this.props.children).filter(
      ({ props: { id } }) => id === activeId,
    )
    return child
  }
}

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  steps: PropTypes.array,
}

Steps.defaultProps = {
  step: null,
}

Steps.contextTypes = {
  wizard: PropTypes.object,
}

export default Steps
