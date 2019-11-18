import React from 'react';
import { Consumer } from '../../services/OffertContext'
import OffertItem from './components/offert-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';

export default function Tab2(props) {
    return (
        <Consumer>
            {({ offerts }) => {
                const offertsInactive = _.filter(offerts, (offert) => !offert.active)
                if (_.isEmpty(offertsInactive)) {
                    return <EmptyOffertList />
                }
                console.log("Consumer tab 1 ", offerts)
                return (
                    <div className="my-offerts-container">
                        {
                            _.map(offertsInactive, (offert) => {
                                return (
                                    <OffertItem
                                        key={offert.id}
                                        title={offert.title}
                                        price={offert.price}
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


