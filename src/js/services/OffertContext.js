import React, { createContext, useState } from 'react'
import OffertService from './offerts';

const OffertContext = createContext();

const { Consumer } = OffertContext;
class Provider extends React.Component {
  state = {
    loading: true,
    offerts: []
  }
  async  componentDidMount() {
    await this.getMyOfferts()
  }

  getMyOfferts = async () => {
    const offertService = new OffertService();
    this.setState({ loading: true })
    const response = await offertService.getMyOfferts()
    this.setState({ loading: false })
    if (response.success) {
      this.setState({ offerts: response.res })
    } else {
      this.setState({ offerts: response.res })
    }
  }

  render() {
    const { children } = this.props;
    const { offerts, loading } = this.state;
    const value = {
      offerts,
      loading,
      getOfferts: this.getMyOfferts,
    }
    return (
      <OffertContext.Provider
        value={value}
      >
        {children}
      </OffertContext.Provider>
    )
  }
}
export { Provider, Consumer }