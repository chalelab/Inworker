import React from 'react';
import { Consumer } from '../../services/ServiceContext'
import ServiceItem from './components/service-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';

export default function Tab1(props) {
    return (
        <Consumer>
            {( {services} ) => {
                const offertsActive = _.filter(services, (offert) => offert.active);
                if (_.isEmpty(offertsActive)) {
                    return <EmptyOffertList />
                }
                return (
                    <div className="my-offerts-container">
                        {
                            _.map(offertsActive, (offert) => {
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


