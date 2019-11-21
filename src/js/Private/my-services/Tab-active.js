import React from 'react';
import { Consumer } from '../../services/ServiceContext'
import ServiceItem from './components/service-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';
import { getUserid } from '../../services/storage';
import { ServiceModel } from '../../models';

export default function Tab1(props) {
    const userId = getUserid()
    return (
        <Consumer>

            {
                /**
                    @param {{services:[ServiceModel]}} props
                 */
                ({ services }) => {
                    const myownServices = _.filter(services, (service) => {
                        return service.user_guest === userId
                    });
                    if (_.isEmpty(myownServices)) {
                        return <EmptyOffertList />
                    }
                    return (
                        <div className="my-offerts-container">
                            {
                                _.map(myownServices, (service) => {
                                    return (
                                        <ServiceItem
                                            key={service.id}
                                            title={service.title}
                                            price={service.price}
                                            details={service.details}
                                            onDelete={props.onDelete(service)}
                                            onEdit={props.onEdit(service)}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }}
        </Consumer>

    )
}


