import React from 'react';
import { Consumer } from '../../services/OffertContext'
import OffertItem from './components/offert-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';

export default function Tab1(props) {
    return (
        <Consumer>
            {({ offerts }) => {
                const offertsActive = _.filter(offerts, (offert) => offert.active);
                if (_.isEmpty(offertsActive)) {
                    return <EmptyOffertList />
                }
                return (
                    <div className="my-offerts-container">
                        {
                            _.map(offertsActive, (offert) => {
                                return (
                                    <OffertItem
                                        key={offert.id}
                                        title={offert.title}
                                        price={offert.price}
                                        details={offert.details}
                                        onDelete={props.onDelete(offert)}
                                        onEdit={props.onEdit(offert)}
                                        onOpen={props.onOpen(offert)}
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


