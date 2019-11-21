import React, { createContext, useState } from 'react'
import ServiceService from './service';

const ServiceContext = createContext();

const { Consumer } = ServiceContext;
class Provider extends React.Component {
  state = {
    loading: true,
    services: []
  }
  async  componentDidMount() {
    await this.getMyServices()
  }

  getMyServices = async () => {
    const serviceService = new ServiceService();
    this.setState({ loading: true })
    const response = await serviceService.getMyServices()
    this.setState({ loading: false })
    if (response.success) {
      this.setState({ services: response.res })
    } else {
      this.setState({ services: response.res })
    }
  }

  render() {
    const { children } = this.props;
    const { services, loading } = this.state;
    const value = {
      services,
      loading,
      getMyServices: this.getMyServices,
    }
    return (
      <ServiceContext.Provider
        value={value}
      >
        {children}
      </ServiceContext.Provider>
    )
  }
}
export { Provider, Consumer }