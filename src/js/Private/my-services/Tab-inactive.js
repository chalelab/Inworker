import React from 'react';
import { Consumer } from '../../services/ServiceContext'

import ServiceItem from './components/service-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';

export default function Tab2(props) {
    return (
        <Consumer>
            {({  services }) => {
                const offertsInactive = _.filter(services, (offert) => !offert.active)
                if (_.isEmpty(offertsInactive)) {
                    return <EmptyOffertList />
                }
                console.log("Consumer tab 1 ", services)
                return (
                    <div className="my-offerts-container">
                        {
                            _.map(offertsInactive, (offert) => {
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


