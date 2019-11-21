import React from 'react';
import { Consumer } from '../../services/ServiceContext'

import ServiceItem from './components/service-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';
import { ServiceModel } from '../../models';
import { getUserid } from '../../services/storage';

export default function Tab2(props) {
    const userId = getUserid()

    return (
        <Consumer>
            {
                /**
                    @param {{services:[ServiceModel]}} props
                 */
                
                ({  services }) => {
                const otherServices = _.filter(services, (service) => service.userId_own !== userId)
                if (_.isEmpty(otherServices)) {
                    return <EmptyOffertList />
                }
                console.log("Consumer tab 1 ", services)
                return (
                    <div className="my-offerts-container">
                        {
                            _.map(otherServices, (offert) => {
                                return (
                                    <ServiceItem
                                        key={offert.id}
                                        title={offert.title}
                                        price={offert.price}
                                        details={offert.details}
                                        onDelete={props.onDelete(offert)}
                                        onEdit={props.onEdit(offert)}
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


